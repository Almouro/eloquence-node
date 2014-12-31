var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var httpUtils = require('./http-utils')();
var processSentence = require('./sentence-processor.js');

/**
 * Check the synonym page found corresponds to our word
 * In the thesaurus.com page the wrapper heading row contains the word
**/
function checkSynonymsRelevant(word, wrapper){
  //Get to the span in header row, remove "for " and compare to current word
  return wrapper.find(".filters").find(".heading-row").find("span")
    .text().substring(4).toLowerCase() === word.toLowerCase();
}

function getSynonymFromAElement(a){
  return {
            complexity: a.attr('data-complexity'),
            length: a.attr('data-length'),
            text: a.find(".text").text(),
            common: a.hasClass("common-word"),
            informal: a.hasClass("informal-word"),
            relevance: a.attr('data-category').split("relevant-")[1][0]
          };
}

function processWordData(html, word){
  var data = {};

  //The synonym wrappers correspond to the different uses of the word
  //For example: for word, there's a wrapper for "noun: discussion", "noun: statement"...
  var wrappers = $(html).find(".synonyms_wrapper .synonyms");

  //Assume if one is correct, then all are correct
  if(!checkSynonymsRelevant(word, wrappers.first())) return data;

  wrappers.each(function(){
    var wrapper = $(this);
    var blockDescription = wrapper.find(".synonym-description");

    //type: noun, adj...
    var type = blockDescription.find(".txt").text();
    //example of synonym which gives the meaning of our word used in the current wrapper context
    var synExample = blockDescription.find(".ttl").text();

    var synonyms = wrapper.find(".relevancy-list").find("a");

    if(!data[type]) data[type] = {};
    if(!data[type][synExample]) data[type][synExample] = [];

    synonyms.each(function(){
      var a = $(this);
      data[type][synExample].push(getSynonymFromAElement(a));
    });
  });

  return data;
}

module.exports = function(word, callback){
  var options = {
    host: 'www.thesaurus.com',
    port: 80,
    path: '/browse/' + encodeURI(word)
  };

  httpUtils.getEntireHtml(options, function(html){
    callback(word, processWordData(html, word))
  });
};