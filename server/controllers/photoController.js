var Photo = require('../db/models/photo');
var Promise = require('bluebird');

module.exports = {

  findOrCreate: function(req) {
    return new Promise(function(resolve, reject) {
      new Photo({ image_url: req.body.image_url })
        .fetch().then(function (found) {
          if (found) { // If image already exists
            req.body.image_id = found.attributes.id;
            resolve(req);
          } else { // Image doesn't exist
            // add photo to db
            var newPhoto = new Photo({
              image_url: req.body.image_url,
              user_id: req.body.user_id,
              group_id: req.body.group_id
            });
            newPhoto.save()
            .then(function(){
              req.body.image_id = newPhoto.attributes.id;
              resolve(req);
            }).catch(reject);
          }
        });
    });
  },

  getPhoto: function (photo_id, req, res, next) {
    new Photo({id: photo_id})
      .fetch()
      .then(function (photo) {
        photo.attributes.views = parseInt(photo.attributes.views+1);
        photo.save().then(function(){
          console.log('view updated!');
          res.status(200).send(photo);
        });
      });
  },

  getAllPhotos: function (req, res, next) {
    new Photo()
      .fetchAll({
      })
      .then(function (photos) {
        res.status(200).send(photos);
      });
  },

  getPhotosByGroup: function (group_id, req, res, next) {
    new Photo({group_id: group_id})
      .fetchAll()
      .then(function(item){ // check if already exists, update if exist
        if(item){
          res.status(200).send(item);
        }else{
          res.status(404).end();
        }
      });
  },


};