// set up ===============================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var bodyParser = require("body-parser");

// configuration ========================================================
mongoose.connect(database.url);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// this is needed for css,js files to be located under public/
app.use(express.static(__dirname + '/public'));

// routes ================================================================
require('./app/routes')(app);

// listen and start up node server ========================================

app.listen(port);
console.log("App listening on port" + port);