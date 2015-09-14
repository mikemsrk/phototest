var util = require('../lib/utility');
var db = require('../db/config');
var User = require('../db/models/user');

exports.loginUser = function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  User.findUser(username,function(data){
    if(!data.length) res.redirect('/login');
    else{
      var user = data[0];
      user.comparePassword(password,function(match){
        if(match){
          util.createSession(req,res,user);
        }else{
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  User.findUser(username,function(data){
    if(!data.length){
      User.createUser(username,password,function(user){
        util.createSession(req,res,user);
      });
    }else{
      console.log('Account already exists!');
      // res.redirect('/signup');
      res.end('account already exists!');
    }
  });
};