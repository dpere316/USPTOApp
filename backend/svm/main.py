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
    base_model_creator(client, stopwords)
    base_estimator = model_loader()

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
    continue_after = None
    try:
        continue_starter = load('continue_token.joblib')
        continue_after = continue_starter
    except FileNotFoundError:
        print('no token found')
        continue_after = None
        
    if not continue_after:
        print('no Continue After')
        continue_starter = load('continue_tester.joblib')
        continue_after = continue_starter
        
    with cluster.watch(resume_after=continue_after) as stream:
        print("Listening...")
        while stream.alive:
            change = stream.next()
            if change is not None:
                entry = change['fullDocument']
                print(f'Entry:{entry}')
                entries +=1
                ids.append(entry['document'])
                target.append(entry['MachineLearningPatent'])
                if entries > 3:
                    continue_after = change['_id']
                    print(ids)
                    print(target)
                    X, y = to_learn(client, ids, target, stopwords)
                    #sleep(5)
                    learner.teach(X=X, y=y)
                    print("done with cycle")
                    entries = 0
                    ids = []
                    target = []

#         for idx in range(len(X)):
#             query_idx, query_instance = learner.query(X)
#             learner.teach(X[query_idx].reshape(1, -1), y[query_idx].reshape(1, -1))    
#     with cluster.watch(resume_after=continue_after) as stream:
#         print('Entering full loop with resume_after')
#         while stream.alive:
#             change = stream.next()
#             if change is not None:
#                 entry = change['fullDocument']
#                 print(f'Entry:{entry}')
#                 entries +=1
#                 ids.append(entry['document'])
#                 target.append(entry['MachineLearningPatent'])
#                 if entries > 7:
#                     print("Learning")
#                     X, y = to_learn(client, ids, target, stopwords)
#                     print("Teaching")
# #                     for idx in range(len(X)):
# #                         query_idx, query_instance = learner.query(X)
# #                         learner.teach(X[query_idx].reshape(1, -1), y[query_idx].reshape(1, -1))
#                     continue_after = change['_id']
#                     dump(contiune_after,'continue_token.joblib')
#                     entries = 0

                        
except KeyboardInterrupt:
    print("Interrupted")
print("Finalizing ...")
if continue_after is not continue_starter:
    print("Dumping continue_after")
    dump(learner.estimator, f'models/Final/model_at_{time():0.0f}.joblib')
    dump(continue_after,'continue_token.joblib')
else:
    print("No successful iterations... No changes will be made.")