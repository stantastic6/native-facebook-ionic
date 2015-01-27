// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

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

.controller('facebookAuthenticationCtrl', function($scope, $cordovaFacebook){
   $scope.userID = null;
   $scope.authError = false;
   $scope.accessToken = null;
   $scope.userName = null;
   $scope.userEmail = null;


  $scope.login = function (){
    $cordovaFacebook.login(["public_profile", "email"])
    .then(function(response) {
      // Login
      
      $scope.userID = response.authResponse.userID;
      $scope.accessToken = response.authResponse.accessToken;

      $cordovaFacebook.api('/me', null)
        .then(function(userData){
          // Get User data you have been granted access to
          $scope.userName = userData.first_name +" " +userData.last_name;
          $scope.userEmail = userData.email
        }), function (error) {
          console.log("Error: " +error)
        }
    }), function (error) {
      console.log("Error: " +error);
      $scope.authError = true;
    }
  }

  $scope.logout = function () {
    $cordovaFacebook.logout()
      .then(function(success) {
        
        $scope.userID = null;
        $scope.accessToken = null;
      }), function (error) {
        console.log(error)
      }
  }
});