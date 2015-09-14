var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app,express){

  app.use(cookieParser());
  app.use(session({
    secret: 'shhh, it\'s a secret',
    resave: true,
    saveUninitialized: false
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};