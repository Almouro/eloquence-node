var parseSentence = require('./sentence-parser.js');
var findSynonymForWord = require('./synonyms.js');

module.exports = function(sentence, words, callback){
  var synData = {};
  var parseData = {};

  var nbAsyncFcts = words.length + 1;

  function countdown(){
    nbAsyncFcts--;
    if(nbAsyncFcts > 0) return;

    var result = {
      'parse-data': parseData,
      'synonyms-data': synData
    };

    callback(result); 
  }

  var addWordData = function(word, wordData){
    synData[word] = wordData;
    countdown();
  };

  words.forEach(function(word){
    findSynonymForWord(word, addWordData);
  });

  parseSentence(sentence, function(error, data){
    parseData = data;
    countdown();
  });
};