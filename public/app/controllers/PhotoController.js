angular.module('photo.photos',['photo.services'])

.controller('PhotoController',function($scope,PhotoReq){

  $scope.creds;
  $scope.images = [];
  var bucket;

  // Request S3 access keys from server
  PhotoReq.getCred().then(function(res){
    $scope.creds = res.data;    
    // AWS Configuration
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = $scope.creds.region;
    // Access bucket
    bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
    // Initial load of S3 bucket images
    $scope.refresh();
  });

  $scope.refresh = function(){
    bucket.listObjects(function(error, data) {
      if (error) {
        console.log(error); // an error occurred
      } else {
        $scope.images = [];
        for (var i = 1; i < data.Contents.length; i++) {
          $scope.images.push({url:'http://dropbucket-mikemsrk.s3.amazonaws.com/' + data.Contents[i].Key});
        };
        $scope.$apply();
      }
    });
  };
   
  $scope.upload = function() {
    if($scope.file) {
      var params = { Key: 'images/'+ $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256', ACL: 'public-read' };
      bucket.putObject(params, function(err, data) {
        if(err) {
          // There Was An Error With Your S3 Config
          alert(err.message);
          return false;
        }
        else {
          // Success!
          console.log(data);
          alert('Upload Done');
          $scope.refresh();
        }
      })
      .on('httpUploadProgress',function(progress) {
        // Log Progress Information
        console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
      });
    }
    else {
      // No File Selected
      alert('No File Selected');
    }
  };


});