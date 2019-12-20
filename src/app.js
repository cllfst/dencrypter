var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const joi = require('joi');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signRouter = require('./routes/SignUp');
//var loginRouter = require('./routes/login');


var app = express();

const http = require('http');

const createUserSchema = joi.object().keys({
   username: joi.string().alphanum().min(2).max(30).required(),
   password: joi.string().min(2).max(30).required(),
   email: joi.string().email().required(),
   signup: joi.allow(),
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signUp', signRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`listening on port ${port} `));

module.exports = app;
