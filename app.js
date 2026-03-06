
var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider){
  $routeProvider
  .when('/register',{
    templateUrl:'views/register.html',
    controller:'authController'
  }).when('/login',{
    templateUrl:'views/login.html',
    controller:'authController'
  }).otherwise({
    redirectTo:'index.html'
  })
});