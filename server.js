

// Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var request = require("request");
var cheerio = require("cheerio");
var PORT = process.env.PORT || 3000;
var app = express();
var router = express.Router();

require('./routes/index.js')(router);



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', router);

app.listen(3000, function() {

  console.log("App running on port 3000!");

});


var Promise = require('bluebird');
var mongoose = require('mongoose');

mongoose.Promise = Promise;


mongoose.createConnection("mongodb://localhost/newsscraper");

var db = mongoose.connection;

db.on("error", function(error) {

  console.log("Mongoose Error: ", error);

});

db.once("open", function() {

  console.log("Mongoose connection successful.");

});

module.exports = db;



