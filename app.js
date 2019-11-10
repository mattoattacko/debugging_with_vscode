const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

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

// Reverse logic
function reverseString(string) {
  //Create an array of characters from a string
  const charactersArray = string.split('');
  //Reverse the array
  const reversedCharactersArray = charactersArray.reverse();
  //Join reversed characters back together
  return reversedCharactersArray.join('');
}

app.get('/:userString', (request, response) => {
  //Obtain original user string
  const original = request.params.userString;
  //Reverse the string back
  const reversed = reverseString(original);
  //Send to view
  response.render('reverse', {reversed});
});

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
