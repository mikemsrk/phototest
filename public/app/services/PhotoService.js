angular.module('photo.services',[])

.factory('PhotoReq',function($http){

  // Get creds for S3 requests
  var getCred = function(){
    return $http({
      method:'GET',
      url: '/api/creds'
    });
  };

  return {
    getCred: getCred
  };


});