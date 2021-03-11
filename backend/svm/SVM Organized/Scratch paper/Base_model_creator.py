#!/usr/bin/env python
# coding: utf-8

# In[1]:




# In[2]:


client = MongoClient("mongodb://compute1.cognac.cs.fiu.edu:59122/PatentData?readPreference=secondary&ssl=false")
db = client['PatentData']
collection = db['CSV_Patents']


# In[42]:


results = collection.find(limit = 500, filter = {'grp_ml': 'seed'})


# In[43]:


seeds = pd.DataFrame(list(results))


# In[45]:


antiseeds = pd.DataFrame(list(collection.find(limit = 500, filter = {'grp_ml': 'antiseed'})))


# In[47]:


seeds['text'] = seeds['abstract']+""+seeds['title']
antiseeds['text'] = antiseeds['abstract']+""+antiseeds['title']


# In[49]:


df = seeds.append(antiseeds)


# In[53]:


df = df.reset_index(drop=True)


# In[57]:


data = df[['_id','text','grp_ml']]


# In[58]:


data['grp_ml']= data.grp_ml.map(dict(seed=1, antiseed=0))


# In[61]:


stopwords = []
with open('stopwords.txt') as f:
    lines = f.readlines()
    for line in lines:
        stopwords.append(line[:-1])


# In[62]:


vectorizer = CountVectorizer(stop_words = stopwords)


# In[64]:


X = vectorizer.fit_transform(data['text'].values)
svd = TruncatedSVD(n_components=100,random_state=42)
X = svd.fit_transform(X)
y = data['grp_ml'].values


# In[66]:


learner = ActiveLearner(
    estimator=svm.SVC(kernel='linear', gamma='scale', C=2, probability = True),
    query_strategy=uncertainty_sampling,
    X_training=X, y_training=y
)


# In[81]:


dump(learner.estimator,'models/Final/base_model.joblib')


# In[ ]:




