var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({type : '*/*'}));
app.use(bodyParser.urlencoded({ extended: false }));


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next()
});


module.exports = app;
