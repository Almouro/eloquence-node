var processSentence = require('./sentence-processor');

module.exports = function(app){
  app.get('/sentence/:data', function(request, response) {
    var data = request.params.data;
    data = JSON.parse(data);

    var sentence = data['sentence'];
    var words = data['words'];

    processSentence(sentence, words, function(result){
      response.json(result);
    });

  });
};