app.controller('adminController',function($scope){
  $scope.userInfo = JSON.parse(localStorage.getItem('user'));
  $scope.customers = [];
  $scope.customersFound = true;

  
});