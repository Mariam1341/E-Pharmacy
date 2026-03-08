app.controller('CheckoutController', function($scope, salesService, notificationService) {
    $scope.cart = JSON.parse(localStorage.getItem("cart")) || [];
    $scope.user = JSON.parse(localStorage.getItem("user")) || '';

    console.log($scope.cart)
    $scope.order = {
        customerName: $scope.user.name || '', 
        items: $scope.cart,
        totalAmount: 0
    };

    $scope.placeOrder = function() {
        let invoiceData = {
            customerName: $scope.user.userName, 
            totalAmount: $scope.getTotal(),
            address: $scope.order.address,
            phone: $scope.order.phone,
            status:'Pending',
            items: $scope.cart.map(item => ({
                medicine_id: item.id,
                qty: item.qty,
                total: item.price
            }))
        };

        salesService.addInovice(invoiceData)
         .then(function(response) {
                notificationService.showMsg("Order Placed Successfully!", "success");
                localStorage.removeItem("cart");
                $scope.cart = [];
                window.location.href = "#!/home";
            })
            .catch(function(err) {
                console.error(err);
                notificationService.showMsg("Failed to place order", "error");
            });     
    };

    $scope.getTotal = function() {
        let total = 0;
        $scope.cart.forEach(item => {
            total += (item.price * item.qty);
        });
        return total;
    };
});