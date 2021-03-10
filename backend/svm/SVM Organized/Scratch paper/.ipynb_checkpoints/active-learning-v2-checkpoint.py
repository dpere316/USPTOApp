#!/usr/bin/env python
# coding: utf-8

# ### Imports

# In[1]:


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


# ## Load Data

# In[2]:


with open('successful.json') as f:
    patents = json.load(f)


# In[3]:


seed_data = pd.DataFrame(patents['seed'])
antiseed_data = pd.DataFrame(patents['antiseed'])
antiseed_data['seed'] = 0
seed_data['seed'] = 1
all_data = antiseed_data
all_data = all_data.append(seed_data)
all_data = all_data.reset_index(drop=True)
all_data = all_data.sample(frac=1).reset_index(drop=True)
all_data['text'] = all_data['title'] + " " + all_data['abstract']
all_data[:5]


# In[4]:


all_data['seed'].value_counts()


# ## Prepare Data

# ### Create Vectorizer

# In[5]:


stopwords = []
with open('stopwords.txt') as f:
    lines = f.readlines()
    for line in lines:
        stopwords.append(line[:-1])


# In[6]:


vectorizer = CountVectorizer(stop_words = stopwords)


# In[7]:


X_raw = vectorizer.fit_transform(all_data['text'].values)
svd = TruncatedSVD(n_components=100,random_state=42)
X_raw = svd.fit_transform(X_raw)
y_raw = all_data['seed'].values


# In[8]:


X_raw.shape


# ### Split training set

# In[9]:


n_initial = 100


# In[10]:


X_train, X_test, y_train, y_test = train_test_split(X_raw, y_raw)

initial_idx = np.random.choice(range(X_train.shape[0]), size=n_initial, replace=False)

X_initial, y_initial = X_train[initial_idx], y_train[initial_idx]
X_pool, y_pool = np.delete(X_train, initial_idx, axis=0), np.delete(y_train, initial_idx, axis=0)


# In[11]:


y_initial


# ## Initialize learner

# In[12]:


learner = ActiveLearner(
    estimator=svm.SVC(kernel='linear', gamma='scale', C=2, probability = True),
    query_strategy=uncertainty_sampling,
    X_training=X_initial, y_training=y_initial
)


# In[17]:


learner.estimator


# In[18]:


# import pickle
# pickle.dump(learner.estimator, open('models/model0.sav','wb'))
# loaded_model = pickle.load(open('models/model0.sav','rb'))


# In[14]:


predictions = learner.predict(X_raw)
is_correct = (predictions == y_raw)

predictions


# In[15]:


unqueried_score = learner.score(X_raw, y_raw)


# In[16]:


unqueried_score


# ### Active Learning loop

# In[22]:


N_QUERIES = 20
performance_history = [unqueried_score]

# Allow our model to query our unlabeled dataset for the most
# informative points according to our query strategy (uncertainty sampling).
for index in range(N_QUERIES):
    query_index, query_instance = learner.query(X_pool)

    # Teach our ActiveLearner model the record it has requested.
    X, y = X_pool[query_index].reshape(1, -1), y_pool[query_index].reshape(1, )
    learner.teach(X=X, y=y)

    # Remove the queried instance from the unlabeled pool.
    X_pool, y_pool = np.delete(X_pool, query_index, axis=0), np.delete(y_pool, query_index)

    # Calculate and report our model's accuracy.
    model_accuracy = learner.score(X_test, y_test)
    
    filename = 'models/model'+str(index)+'.sav'
    pickle.dump(learner.estimator, open(filename,'wb'))
    print('Accuracy after query {n}: {acc:0.4f}'.format(n=index + 1, acc=model_accuracy))

    # Save our model's performance for plotting.
    performance_history.append(model_accuracy)

