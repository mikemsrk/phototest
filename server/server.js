var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

module.exports = io;

require('./lib/middleware.js')(app, express); // load up all middlewares

//listen for client connections
io.on('connection', function(user) {
  console.log('client connected.');
});

var authRouter = require('./routes/auth'); // Authentication not implemented.
var mainRouter = require('./routes/main');


app.use('/auth', authRouter);
app.use('/', mainRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.listen(port,function(err){
  console.log('app listening on...' + port);
});