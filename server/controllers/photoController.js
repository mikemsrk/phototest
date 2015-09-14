var util = require('../lib/utility');
var db = require('../db/config');
var Photo = require('../db/models/photo');


exports.fetchPhotos = function(req,res){
  Photo.findPhoto(null,function(result){
    res.status(200).send(result);
  });
};

exports.savePhoto = function(req,res){
  var image_url = req.body.image_url;
  var user_id = req.body.user_id;
  var group_id = req.body.group_id;

  Photo.findPhoto({query:'image_url',target:image_url},function(result){
    if(result && result.length>0) { // already exists
      res.status(200).send(result);
    }
    else{ // create new
      Photo.createPhoto(image_url,user_id,group_id,function(err,photo){
        if(err) res.send(err);
        res.status(200).send(photo);
      });
    }
  });
};
