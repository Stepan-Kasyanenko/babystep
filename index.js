//requiring NPM modeles
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();


//requiring local modeles
var configs = require('./config');


// Uncomment the following lines to start logging requests to consoles.
// app.use(morgan('combined'));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());

// serve video files.
app.use('/',express.static('client'));
app.use('/bower_components',express.static('bower_components'));

//Finally starting the listener
app.listen(configs.applicationPort, function () {
  console.log('Example app listening on port '+configs.applicationPort+'!');
});
