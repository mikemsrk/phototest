var express = require('express');
var router = express.Router();
var photoController = require('../controllers/photoController');


// Accept  an  image attachment  as  well  as  user_id and group_id  parameter.
// The image should  be  uploaded  to  Amazon  S3  (you  can create  a free  account)  or  a similar 
// cloud storage service.  Alternatively if  you don't have  access  to  a cloud storage account,  
// provide a way to  pass  an  image_url parameter as  a string. 
// The user_id,  group_id  and image_url (either the provided  string  or  the URL of  the uploaded  
// image)  should  create  a new entry in  the photos  table.
router.post('/upload', function(req,res){
  console.log('attempting to upload photo info.');
  photoController.savePhoto(req,res);
});

// List  the entire  photos  table in  a JSON  feed  (should include primary key and all columns).
// If  a parameter is  provided  (i.e. /list/2), filter  for that  group_id  (i.e. 2).
router.get('/list', function(req,res){


});


// Accept  a parameter that  looks up  the database  entry by  primary key (i.e. /view/12  returns row 12).  
// Should  return  the image from  specified in  image_url and increment the object's  'views'  column  by  1.
router.get('/view/:id', function(req,res){


});



module.exports = router;