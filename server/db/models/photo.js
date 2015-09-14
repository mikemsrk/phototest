var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
var util = require('../../lib/utility');


db.photoSchema.methods.incrementView = function(){
  console.log('incrementing view...');
  var photo = this;
  this.update({views: this.views+1},function(err,raw){
    if(err)console.log(err);
  });
};

var Photo = mongoose.model('Photo',db.photoSchema);


exports.findPhoto = function(params,callback){
  if(params === null){
    Photo.find().exec(function(err,data){
      callback(data);
    });
  }else{
    Photo.find()
      .where(params.query).equals(params.target)
      .exec(function(err,data){
        callback(data);
      });
  }
};

exports.createPhoto = function(image_url,user_id,group_id,callback){
  // create new photo record
  var photo = new Photo({
    image_url: image_url,
    views: 0,
    user_id: user_id,
    group_id: group_id
  });
  // save the thing.
  photo.save(function(err){
    callback(null,photo);
  });
};