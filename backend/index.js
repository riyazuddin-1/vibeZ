const express = require('express');
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')

const config =require('./config.json');

var routes = require("./routes");

const app = express();

app.use(cors());
app.options('*', cors())

app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(config.port);