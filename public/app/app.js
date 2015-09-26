angular.module('photo',['ui.router','photo.photos','photo.directives','photo.services'])

.run(function($state){
  $state.go('home');
})
.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/templates/photos.html',
        controller:'PhotoController'
      });
});