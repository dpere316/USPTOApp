#!/usr/bin/env python
# coding: utf-8

from functions import *
from time import time

#stablish connection to the database

client = MongoClient("mongodb://compute1.cognac.cs.fiu.edu:59122/PatentData?readPreference=secondary&ssl=false")
db = client['PatentData']
cluster = db['labels']

#load stopwords

try:
    stopwords = []
    with open('stopwords.txt') as f:
        lines = f.readlines()
        for line in lines:
            stopwords.append(line[:-1])
except FileNotFoundError:
    print('stopwords.txt not found, seeting stopwords="english"')
    stopwords=english

#create learner and check for base_learner
    
learner = None
try:
    print("Checking for Base Model")
    base_estimator = model_loader()
    print("Model Successfully loaded")
except FileNotFoundError:
    print("File not Found, creating a base model")
    learner = base_model_creator(client, stopwords)
    

if learner is None:
    learner = ActiveLearner(
        estimator=base_estimator,
        query_strategy=uncertainty_sampling
    )


# main logic loop. Open the stream and look for updates to labels database, each 3 updates (3 for testing 100 for prod(?)) the model will learn
# the new labels which will be processed first. finally we will dump the resume token in order to continue with the process later on
    
entries = 0
ids = []
target = []
try:
    try:
        continue_after = load('continue_token.joblib')
    except FileNotFoundError:
        print('no token found')
        continue_after = None
        
    if not continue_after:
        with cluster.watch() as stream:
            while stream.alive:
                change = stream.next()
                if change is not None:
                    entry = change['fullDocument']
                    entries +=1
                    ids.append(entry['document'])
                    target.append(entry['MachineLearningPatent'])
                    if entries > 3:
                        continue_after = change['_id']
                        break

        X, y = to_learn(client, ids, target, stopwords)
        learner.teach(X=X, y=y)
        
    
    with cluster.watch(resume_after=continue_after) as stream:
        while stream.alive:
            change = stream.next()
            if change is not None:
                entry = change['fullDocument']
                entries +=1
                ids.append(entry['document'])
                target.append(entry['MachineLearningPatent'])
                    if entries > 3:
                        X, y = to_learn(client, ids, target, stopwords)
                        learner.teach(X=X, y=y)
                        continue_after = change['_id']
                        dump(contiune_after,'continue_token.joblib')
                        
                        
except KeyBoardInterrupt:
    print("Interrupted")
    dump(learner.estimator, f'models/Final/model_at_{time():0.0f}.joblib')
print("Finalizing ... dumping continue_after")
dump(contiune_after,'continue_token.joblib')