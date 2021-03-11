#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import numpy as np
import json

import sklearn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn import svm

from sklearn.decomposition import TruncatedSVD

from modAL.models import ActiveLearner
from modAL.uncertainty import uncertainty_sampling

import pickle
from joblib import dump, load
import pymongo
from pymongo import MongoClient


# ## Process and Teach
# ### get list of ids and list of 'txt' field
# ### match vectorize and return for learning

# In[25]:


client = MongoClient("mongodb://compute1.cognac.cs.fiu.edu:59122/PatentData?readPreference=secondary&ssl=false")
db = client['PatentData']
collection = db['Patents']


# In[63]:


##mocked parameters
ids = ['05664062', '08037928', '09037463']
target = ['No', 'No','No']


# In[59]:


stopwords = []
with open('stopwords.txt') as f:
    lines = f.readlines()
    for line in lines:
        stopwords.append(line[:-1])


# In[64]:


entries = collection.find(filter = {'documentId':{'$in':ids}})


# In[65]:


entries = list(entries)


# In[66]:


txt = [p['abstract']+''+p['title'] for p in entries]
lst = list(map(lambda x: 1 if x=='Yes' else 0, ids))


# In[67]:


df = pd.DataFrame(data = {'id':ids,'text':txt,'target':lst})


# In[68]:


vectorizer = CountVectorizer(stop_words = stopwords)


# In[69]:


X = vectorizer.fit_transform(df['text'].values)
svd = TruncatedSVD(n_components=100,random_state=42)
X = svd.fit_transform(X)
y = df['target'].values


# In[ ]:


#return
X, y

