var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;

var server = require('http').Server(app);
var io = require('socket.io')(server);

//listen for client connections
io.on('connection', function(user) {

  console.log('client connected.');

  // When user uploads a photo, broadcast event to fetch new data from server.
  user.on('upload',function(){
    console.log('upload event received');
    user.emit('update');
    user.broadcast.emit('update');
  });
});

require('./lib/middleware.js')(app, express); // load up all middlewares

var authRouter = require('./routes/auth'); // Authentication not implemented.
var mainRouter = require('./routes/main');


app.use('/auth', authRouter);
app.use('/', mainRouter);

app.use(express.static(path.join(__dirname, '../public')));

server.listen(port,function(err){
  console.log('app listening on...' + port);
});