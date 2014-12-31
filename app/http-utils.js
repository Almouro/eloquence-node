var http = require('http');

module.exports = function(){
  return {
    getEntireHtml: function(options, callback){
      var chunks = [];

      http.get(options, function(response){
        response.on('data', function(data){
          chunks.push(data);
        }).on('end', function(){
          callback(chunks.join(''));})
      });
    },
  };
};