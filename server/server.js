var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;


app.use(express.static(path.join(__dirname, '../public')));


app.listen(port,function(err){
  console.log('app listening on...' + port);
});