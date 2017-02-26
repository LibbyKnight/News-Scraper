

// Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var Note = require("./models/notes.js");
var Article = require("./models/articles.js");

var request = require("request");
var cheerio = require("cheerio");
var Promise = require("bluebird");

mongoose.Promise = Promise;


var app = express();


app.use(logger("dev"));

app.use(bodyParser.urlencoded({

  extended: false

}));



app.use(express.static("public"));


mongoose.connect("mongodb://localhost/week18day3mongoose");

var db = mongoose.connection;




db.on("error", function(error) {

  console.log("Mongoose Error: ", error);

});



db.once("open", function() {

  console.log("Mongoose connection successful.");

});


// Routes

app.get("/scrape", function(req, res) {

  request("http://www.nytimes.com", function(error, response, html) {

    var $ = cheerio.load(html);

   
   $('h2.story-heading').each(function(i, element){

    var link = $(element).children().attr("href");

    var title = $(element).children().text();

    result.push({

      title: title,

      link: link

    });

    });

  console.log(result);

  });

  res.send("Scrape Complete");

});

app.get("/articles", function(req, res) {



  Article.find({}, function(error, doc) {


    if (error) {

      console.log(error);

    }

     else {

      res.json(doc);

    }

  });

});



app.get("/articles/:id", function(req, res) {

  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...

  Article.findOne({ "_id": req.params.id })

  // ..and populate all of the notes associated with it

  .populate("note")

  // now, execute our query

  .exec(function(error, doc) {

    // Log any errors

    if (error) {

      console.log(error);

    }

    // Otherwise, send the doc to the browser as a json object

    else {

      res.json(doc);

    }

  });

});





// Create a new note or replace an existing note

app.post("/articles/:id", function(req, res) {

  // Create a new note and pass the req.body to the entry

  var newNote = new Note(req.body);



  // And save the new note the db

  newNote.save(function(error, doc) {

    // Log any errors

    if (error) {

      console.log(error);

    }


    else {

      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })

        .exec(function(err, doc) {

        if (err) {

          console.log(err);
        }

        else {

          res.send(doc);

        }

      });

    }

  });

});





// Listen on port 3000

app.listen(3000, function() {

  console.log("App running on port 3000!");

});