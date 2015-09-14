var express = require('express');
var app = express();
var router = express.Router();
var photoController = require('../controllers/photoController');

// Uploads a single photo information to the DB.
// Params - { image_url: str, user_id: int, group_id: int }
// Return - 200
router.post('/upload', function(req,res){
  console.log(req.body.image_url);

  photoController.findOrCreate(req,res)
    .then(function(data){
      console.log('upload successful');
      res.end();
  });
});

// List the photos by group ID.
// Params - Query parameter: group_id (int)
// Return - JSON object [{},{},{}]
router.get('/list/:group_id', function(req,res){
  console.log('getting photos from group...',req.params.group_id);
  photoController.getPhotosByGroup(req.params.group_id,req,res);
});

// List  the entire  photos  table in  a JSON  feed  (should include primary key and all columns).
// Params - null
// Return - 200
router.get('/list/', function(req,res){
  console.log('getting all photos...');
  photoController.getAllPhotos(req,res);
});


// Accept  a parameter that  looks up  the database  entry by  primary key (i.e. /view/12  returns row 12).  
// Should  return  the image from  specified in  image_url and increment the object's  'views'  column  by  1.

// Params - Query parameter: photo_id (int)
// Return - JSON object {}
router.get('/view/:photo_id', function(req,res){
  console.log('getting individual photo',req.params.photo_id);
  photoController.getPhoto(req.params.photo_id,req,res);
});



module.exports = router;