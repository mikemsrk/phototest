var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;

require('./lib/middleware.js')(app, express); // load up all middlewares

var authRouter = require('./routes/auth');
var mainRouter = require('./routes/main');


app.use('/auth', authRouter);
app.use('/', mainRouter);

app.use(express.static(path.join(__dirname, '../public')));


app.listen(port,function(err){
  console.log('app listening on...' + port);
});