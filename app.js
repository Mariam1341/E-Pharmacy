
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
  }).when('/admin/medicenes',{
    templateUrl:'views/admin/medicines.html',
    controller:'medicineController'
  }).when('/admin/sales',{
    templateUrl:'views/admin/sales.html',
    controller:'salesController'
  }).when('/home',{
    templateUrl:'views/home.html',
    controller:'mainController'
  }).when('/checkout',{
    templateUrl:'views/checkout.html',
    controller:'CheckoutController'
  }).when('/profile',{
    templateUrl:'views/profile.html',
    controller:'profileController'
  }).otherwise({ 
    redirectTo : '/home'
  });
});