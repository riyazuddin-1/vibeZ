var db = require('../database');
const { ObjectId } = require('mongodb');
var collections = require('../database/collections');

let controllers = {};

controllers.getFiles = async (req, res) => {
    let result = await db.collection(collections.audioFiles).find({}).toArray();
    console.log('response sent');
    res.send(result);
}

controllers.uploadFile = async (req, res) => {
    let payload = {
        title: req.body.title,
        credits: req.body.credits,
        filename: req.files.music.name,
        content: req.files.music.data
    }

    db.collection(collections.audioFiles).insertOne(payload)
        .then(() => res.send("Audio uploaded successfully"))
        .catch(err => res.sendStatus(500));
}

module.exports = controllers;