const functions = require("firebase-functions");
const admin = require('firebase-admin');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeIAjlMfkAbCoxYKr8wFCtpaEBjAZLfa0",
    authDomain: "afry-test.firebaseapp.com",
    projectId: "afry-test",
    storageBucket: "afry-test.appspot.com",
    messagingSenderId: "237583337120",
    appId: "1:237583337120:web:0e5f88d374d7f3035c6bc5",
    measurementId: "G-WTRG32SNEP"
  };

admin.initializeApp();
const db = admin.firestore();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

app.get('/people', (req, res) => {
    db.collection('people')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let people = [];
            data.forEach(doc => {
                people.push({
                    personId: doc.id,
                    name: doc.data().name,
                    companyId: doc.data().companyId,
                    createdAt: doc.data().createdAt
                });
            });
            return res.json(people);
        })
        .catch(err => console.error(err));
});

app.post('/person', (req, res) => {
    const newPerson = {
        name: req.body.name,
        companyId: req.body.companyId,
        createdAt: new Date().toISOString()
    };
    db.collection('people')
        .add(newPerson)
        .then(doc => {
            res.json({
                message: `person ${doc.id} created successfully`,
                id: doc.id
            });
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        });
});

app.put('/person/:personId', (req, res) => {
    const document = db.doc(`/people/${req.params.personId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Person not found' });
            }
            let newData = {};
            if ('name' in req.body) newData.name = req.body.name;
            if ('companyId' in req.body) newData.companyId = req.body.companyId;
            document.update(newData);
        })
        .then(() => {
            res.json({ message: `Person ${document.id} updated successfully` });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
});

exports.api = functions.region('europe-west1').https.onRequest(app); 