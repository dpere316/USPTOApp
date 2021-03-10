import sklearn
import pymongo
import pickle
import json

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.decomposition import TruncatedSVD
from sklearn import svm

from modAL.uncertainty import uncertainty_sampling
from modAL.models import ActiveLearner

from pymongo import MongoClient

from joblib import dump, load

import pandas as pd
import numpy as np


#    client = MongoClient("mongodb://compute1.cognac.cs.fiu.edu:59122/PatentData?readPreference=secondary&ssl=false")


# Create base model and save into file
def base_model_creator(client, stopwords):
    db = client['PatentData']
    collection = db['CSV_Patents']
    results = collection.find(limit = 500, filter = {'grp_ml': 'seed'})
    seeds = pd.DataFrame(list(results))
    antiseeds = pd.DataFrame(list(collection.find(limit = 500, filter = {'grp_ml': 'antiseed'})))
    
    
    seeds['text'] = seeds['abstract']+""+seeds['title']
    antiseeds['text'] = antiseeds['abstract']+""+antiseeds['title']
    df = seeds.append(antiseeds)
    df = df.reset_index(drop=True)
    data = df[['_id','text','grp_ml']]
    data['grp_ml']= data.grp_ml.map(dict(seed=1, antiseed=0))

#     stopwords = []
#     with open('stopwords.txt') as f:
#         lines = f.readlines()
#         for line in lines:
#             stopwords.append(line[:-1])
    #Prepare Data
    
#     vectorizer = CountVectorizer(stop_words = stopwords)
#     X = vectorizer.fit_transform(data['text'].values)
#     svd = TruncatedSVD(n_components=100,random_state=42)
#     X = svd.fit_transform(X)
#     y = data['grp_ml'].values
    X, y = vectorize(data, stopwords, target = 'grp_ml')


    # Create Learner
    learner = ActiveLearner(
        estimator=svm.SVC(kernel='linear', gamma='scale', C=2, probability = True),
        query_strategy=uncertainty_sampling,
        X_training=X, y_training=y
    )
    
    # joblib dump
    
    dump(learner.estimator,'models/Final/base_model.joblib')
    return learner
    

def model_loader(model = 'base_model'):
    estimator = load(f"models/Final/{model}.joblib")
    return estimator


def to_learn(client, ids, target, stopwords):
    db = client['PatentData']
    collection = db['Patents']
    entries = list(collection.find(filter = {'documentId':{'$in':ids}}))
    txt = [p['abstract']+''+p['title'] for p in entries]
    target = list(map(lambda x: 1 if x=='Yes' else 0, ids))
    df = pd.DataFrame(data = {'id':ids,'text':txt,'target':lst})
    
    return vectorize(df, stopwords)
    

def vectorize(df, stopwords, target='target'):
    X = vectorizer.fit_transform(df['text'].values)
    svd = TruncatedSVD(n_components=100,random_state=42)
    X = svd.fit_transform(X)
    y = df['target'].values
    return X, y