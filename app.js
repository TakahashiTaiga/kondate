const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
require('dotenv').config();
const helmet = require("helmet");
const csrf = require('csurf');

const historiesRouter = require('./routes/histories');
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
          objectSrc: ["'none'"],
          styleSrc: ["'self'", "https://cdn.jsdelivr.net"],
          upgradeInsecureRequests: [],
      },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false, 
  cookie: { maxAge: 60 * 60 * 1000 }
};
// falseにしてみる
const csrfProtection = csrf({ cookie: true });
app.use(session(session_opt));

// require("./config/passport")(app);

app.use('/histories', historiesRouter);
app.use('/recipes', recipesRouter);
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
  res.render('common/error');
});

module.exports = app;
