// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'authenticationCtrl'
        // })
        // .state('user', {
   //          url: '/users/:userId',
   //          templateUrl: 'templates/user.html',
   //          controller: 'UserController'
        });
        $urlRouterProvider.otherwise('/login');
})

.controller('authenticationCtrl', function($scope) {
  
  $scope.login = function() {
    facebookConnectPlugin.login(['public_profile', 'email'])
      .then(function(response) {
        console.log(response);
        alert(response);
      }), function(error) {
        console.log("Login Error: " +error);
      }
  }
})
