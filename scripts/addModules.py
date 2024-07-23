import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime

cred = credentials.Certificate(r"scripts/database_key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

collection = db.collection('courses')

file = open('scripts\moduleFullInfo.json', encoding="utf8")
data = json.load(file);

for course in data :
    docRef = collection.document(course['moduleCode'])
    if (docRef.get()._data == None) :
        newDoc = collection.document(course['moduleCode'])
        newDoc.set({
            "moduleCode" : course['moduleCode'],
            "title" : course['title'],
            "description" : course['description'],
        })

        courseThread = newDoc.collection('thread')
        courseThread.add({})

file.close();
