var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var utility = require('../lib/utility');

router.post('/signup', function(req,res){
  console.log('attempting signup.');
  userController.signupUser(req,res);
});

router.post('/signin', function(req,res){
  console.log('attempting login.');
  userController.loginUser(req,res);
});

router.get('/signout', function(req,res){
  console.log('logging out.');
  req.session.destroy(function(){
    res.end('successful log out');
  });
});



module.exports = router;