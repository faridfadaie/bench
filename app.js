var express = require('express');
var logger = require('morgan');

var routes = require('./routes/index');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next()
});


module.exports = app;
