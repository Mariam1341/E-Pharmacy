app.controller(
  "mainController",
  function ($scope, medicineService, notificationService) {
    $scope.isLoggedIn = false;
    $scope.currentUser = {};

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
    $scope.closeCart = function(){
      $scope.showCart = false;
    }

    $scope.checkLoginStatus();

    $scope.logout = function () {
      localStorage.clear();
      $scope.isLoggedIn = false;
    };

    $scope.medicines = [];
    $scope.loading = true;

    $scope.getAllMedicines = function () {
      medicineService
        .getAllMedicines()
        .then(function (response) {
          $scope.medicines = response.data;
          $scope.loading = false;
        })
        .catch(function (error) {
          notificationService.showMsg("Error loading medicines", "error");
          $scope.loading = false;
        });
    };



    $scope.removeItem = function(index) {
    $scope.cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify($scope.cart));
    $scope.cartCount = $scope.cart.length;
    notificationService.showMsg("Item removed from cart", "info");
};
    $scope.updateQty = function(item, change) {
    let newQty = item.qty + change;

    if (change > 0) {
        if (newQty <= item.stock) {
            item.qty = newQty;
        } else {
            notificationService.showMsg("Sorry, only " + item.stock + " units available in stock", "error");
            return; 
        }
    } 
    else if (change < 0) {
        if (newQty >= 1) {
            item.qty = newQty;
        } else {
            item.qty = 1; 
        }
    }

    localStorage.setItem("cart", JSON.stringify($scope.cart));
};

    $scope.getAllMedicines();

    $scope.cart = []; 

    $scope.cart=JSON.parse(localStorage.getItem("cart")) 
    ||[];
    $scope.cartCount = $scope.cart.length;

    $scope.handleAddToCart = function (item) {
      let found = $scope.cart.find((p) => p.id === item.id);

      if (found) {
        found.qty += 1; 
      } else {
      
        let productToAdd = angular.copy(item);
        productToAdd.qty = 1;
        $scope.cart.push(productToAdd);
      }
      $scope.cartCount = $scope.cart.length;
      notificationService.showMsg(item.name + " added to cart", "success");
      localStorage.setItem("cart", JSON.stringify($scope.cart));
    };
  },

);
