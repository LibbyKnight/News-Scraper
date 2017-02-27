var express = require('express');
var router = express.Router();
var article = require('../models/articles.js');
var note = require('../models/notes.js');




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


  .exec(function(error, doc) {


    if (error) {

      console.log(error);

    }

    else {

      res.json(doc);

    }

  });

});


app.post("/articles/:id", function(req, res) {

  var newNote = new Note(req.body);


  newNote.save(function(error, doc) {


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