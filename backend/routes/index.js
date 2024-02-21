const express = require('express');
const app = express();

const controllers = require('../controllers')

// API endpoints
app.get('/get-audio-files', controllers.getFiles);

app.post('/upload', controllers.uploadFile);

module.exports = app;