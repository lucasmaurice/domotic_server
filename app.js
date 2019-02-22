var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// ============ DATABASE RELATED PART ===========

// set db table
const db = require('./model/sql_access.js');

if(process.env.APP_DEVELOPMENT != null || process.env.APP_DEVELOPMENT === true){
  // In development mode: force drop the table if it already exists
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
  }).then(() =>{
    // Create a initial user and roles.
    const Init = require('./model/defaults/Init');
    Init.Init(db);
  });
}

// ========= END - DATABASE RELATED PART =========

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/home_trigger'));
app.use('/home_trigger', require('./routes/home_trigger'));

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
