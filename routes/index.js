var express = require('express');
var router = express.Router();
var article = require('../models/articles.js');
var note = require('../models/notes.js');
var scraper = require('../controller/scraper.js');
var request = require("request");
var cheerio = require("cheerio");




router.get('/', function (req, res, next) {


    article.find({}, function (err, data) {

    
        res.render('index', {title: 'News Scraper', articles: data});

    });

});


router.get("/scrape", function(req, res) {


     scraper.scraping(function () {



        console.log("scraping completed");

        res.redirect('/');



    });



});


router.get("/note/:id", function(req, res) {

  article.findOne({ "_id": req.params.id })

  .populate("note")

  .exec(function(error, doc) {


    if (error) {

      console.log(error);

    }

    else {

      res.send(doc.note);
      console.log(doc.note);

    }

  });

});

router.post("/note/:id", function(req, res) {

  var newNote = new note(req.body);

  newNote.save(function(error, doc) {


    if (error) {

      console.log(error);

    }

    else {

      article.findOneAndUpdate(
         {_id: req.params.id},
         {$push: {comments: doc._id}},
         {new: true},

                function (error, newDoc) {

                    if (error) res.send(error);

                    res.send(newDoc);
        
        })

      };

    });

});
module.exports = router;