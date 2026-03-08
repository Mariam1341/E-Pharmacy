app.controller('profileController', function($scope, $http, salesService) {
    let user = localStorage.getItem("user");
    console.log(user)
    $scope.currentUser = user ? JSON.parse(user) : {};

    $scope.isLoggedIn = false;

    $scope.checkLoginStatus = function () {
      let user = localStorage.getItem("user");
      console.log("user");
      if (user) {
        $scope.isLoggedIn = true;
        $scope.currentUser = JSON.parse(user);
      } else {
        $scope.isLoggedIn = false;
      }
    };


    $scope.checkLoginStatus();

    $scope.myOrders = [];
    $scope.getUserOrders = function() {
        if(!$scope.currentUser.id) return;

        salesService.getInvoiceByUser($scope.currentUser.userName)
        .then(function(response){
            $scope.myOrders = response.data;
            
        }).catch(function(error){
          notificationService.showMsg('Error loading history', 'error');

        });

        
    };

    $scope.getUserOrders();
});
