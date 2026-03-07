app.controller('customerController', function($scope, userService, notificationService){

  $scope.customers = [];
  $scope.loading = true;

  showAllCustomers = function(){
    userService.getAllUsers()
    .then(function(response){
      $scope.customers = response.data;
      $scope.loading = false;
      }).catch(function(error) {
          notificationService.showMsg('Error loading customers', 'error');
          $scope.loading = false;
      });
  }
  showAllCustomers();

  
   // this.confirm = function(title, text, iconType, confirmText) {
 
    $scope.deleteCustomer = function(user){


    notificationService.confirm('Delete Confirmation',
       'Are you sure you want to delete ' + user.userName + '?', 'warning', 'Yes, Delete')
       .then(function(result){

        if(result.isConfirmed){
          userService.deleteUser(user.id)
          .then(function(response){
             showAllCustomers();
             notificationService.showMsg('Customer has been deleted successfuly', 'success');          
          }).catch(function(error){
            notificationService.showMsg('Error: Could not delete customer', 'error');
          });
        }
       })



      
    }
});