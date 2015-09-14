var util = require('../lib/utility');
var db = require('../db/config');
var User = require('../db/models/user');

exports.loginUser = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Havn't built out login/signup..

};

exports.signupUser = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // Havn't built out login/signup..

};