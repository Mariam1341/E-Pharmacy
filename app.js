
var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider){
  $routeProvider
  .when('/register',{
    templateUrl:'views/register.html',
    controller:'authController'
  }).when('/login',{
    templateUrl:'views/login.html',
    controller:'authController'
  }).when('/admin/customers',{
    templateUrl:'views/admin/customers.html',
    controller:'customerController'
  }).when('/home',{
    templateUrl:'views/home.html',
  }).otherwise({
    redirectTo:'/home'
  })
});