var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var user = process.env.DB_USER;
var password = process.env.DB_USER_PW;
var admin = 'admin'
var admin_password = process.env.DB_ADMIN_PW;
const dbName = process.env.DB_NAME;

const mongo_route = 'mongodb://' + user + ':' + password + '@fc-database/fc-final-test-node'
// const mongo_route = 'mongodb://' + admin + ':' + admin_password + '@fc-database/fc-final-test-node'
// const mongo_route = process.env.OPENSHIFT_MONGODB_DB_URL;


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect(mongo_route, function(err, client) {
  console.log(mongo_route);
  if (err != null) {
    console.log(err)
  }
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  console.log(db)
  client.close();
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
