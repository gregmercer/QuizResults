
// This app reads in the results from the quiz
// and writes them out to a mysql database

// required modules

var express = require('express')
  , http = require('http');

// routes

var index = require("./routes/index");
var loadquestion = require("./routes/loadquestion");
var loadword = require("./routes/loadword");
var loadwordtime = require("./routes/loadwordtime");
var loadtime = require("./routes/loadtime");
var loadpoll = require("./routes/loadpoll");
var loadphase = require("./routes/loadphase");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', index.index);

app.get('/loadQuestionResults', loadquestion.loadquestion);

app.get('/loadWordResults', loadword.loadword);

app.get('/loadWordTimeResults', loadwordtime.loadwordtime);

app.get('/loadTimeResults', loadtime.loadtime);

app.get('/loadPollResults', loadpoll.loadpoll);

app.get('/loadPhaseResults', loadphase.loadphase);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


