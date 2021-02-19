import pymongo
from pymongo import MongoClient
from pprint import pprint
from bson.json_util import dumps
import json

cluster = MongoClient("mongodb://compute1.cognac.cs.fiu.edu:59122/PatentData?readPreference=secondary&ssl=false")

#We create different objects for the different databases needed
db = cluster['PatentData']
labels_db = db['labels']
patent_db = db['Patents']
data_list = []
cursor = patent_db.find()

list_cur = list(cursor)
json_data = dumps(list_cur, indent =2)

with open("patents.json", 'w') as f:
    f.write(json_data)
