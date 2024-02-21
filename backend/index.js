const express = require('express');
const fileupload = require('express-fileupload')

const config =require('./config.json');

var routes = require("./routes");

const app = express();

app.use(fileupload());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use("/", routes);

app.listen(config.port);