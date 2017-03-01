var cheerio = require('cheerio');
var request = require('request');
var article = require('../models/articles.js');
var url = "http://www.nytimes.com";


function scraping(cb) {

    request(url, function (err, res, body) {

        if (err) console.log(err);

        var $ = cheerio.load(body);

        console.log("Scraping");

    
  var result = [];



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
        console.log("finished scraping");

}

exports.scraping = scraping;