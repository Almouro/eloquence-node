var express = require('express');
var cors = require('cors');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());

require('./routes')(app);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


