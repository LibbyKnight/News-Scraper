var cheerio = require('cheerio');
var request = require('request');
var article = require('../models/articles.js');
var url = "http://www.nytimes.com";


function scraping(cb) {

    request(url, function (err, res, body) {

        if (err) console.log(err);

        var $ = cheerio.load(body);

        console.log("Scraping");

        $('.editorial li').each(function (i, element) {


                var link = $(element).children("a").attr('href');
                var title = $(element).children().text();
                var result = new article({

                    link: link,
                    title: title,
        
                });
        
                result.save(function (err) {

                    if (err) console.log(err);

                })

            });
        console.log(result);
        console.log("finished scraping");

        cb();

    })
}

exports.scraping = scraping;