var bcrypt = require('bcrypt-nodejs');
var db = require('../config');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var CounterSchema = db.counterSchema;

var Counter = mongoose.model('counter', CounterSchema);

var counter = new Counter({
  _id: 'userId',
  seq: 0
});
counter.save(function(err){
  console.log(err);
});

db.userSchema.pre('save',function(next){
  var user = this;

  Counter.findByIdAndUpdate({_id: 'userId'}, {$inc: { seq: 1} }, function(error, counter)   {
    if(error)
        return next(error);
    user.userId = counter.seq;

    var cipher = Promise.promisify(bcrypt.hash);
    
    return cipher(this.password,null,null).bind(this)
      .then(function(hash){
        console.log('Hashing password....' + hash);
        user.password = hash;
        next();
      }); 
  });

  
});

db.userSchema.methods.comparePassword = function(attemptedPassword,callback){
  bcrypt.compare(attemptedPassword,this.password, function(err,isMatch){
    callback(isMatch);
  });
};

var User = mongoose.model('User',db.userSchema);


exports.findUser = function(username,callback){
  User.find()
    .where('username').equals(username)
    .exec(function(err,data){
      if(err)callback(err);
      callback(data);
    });
};

exports.createUser = function(username,password,callback){
  var user = new User({
    username:username,
    password:password
  });
  user.save(function(err){
    if(err)console.log(err);
    callback(user);
  });
};