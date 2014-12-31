var java = require("java");
java.classpath.push("parser.jar");
var parser = java.newInstanceSync("com.eloquence.parser.ParserDemo");

function formatParserOutputToJson(data){
  var words = data.replace(/(\r\n|\n|\r)/gm,"").split(' ');

  var json = {};
  words.forEach(function(word){
    var split = word.split('/');
    if(split.length == 2)
      json[split[0]] = split[1];
  });
  return json;
}

module.exports = function(sentence, callback){
  parser.callAPI(sentence, function (error,data){
    if(data) data = formatParserOutputToJson(data);
    callback(error, data);
  })
};