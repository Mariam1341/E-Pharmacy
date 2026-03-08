app.controller(
  "salesController",
  function ($scope, salesService, notificationService, medicineService) {
    $scope.allInvoices = [];
    $scope.loading = true;
    $scope.medicines = [];

    $scope.getAllMedicines =function(){
      medicineService.getAllMedicines()
      .then(function(response){
        $scope.medicines = response.data;
        $scope.loading = false;
        }).catch(function(error) {
            notificationService.showMsg('Error loading medicines', 'error');
            $scope.loading = false;
        });
      }
  $scope.getAllMedicines();

    $scope.getAllInovices = function () {
      salesService
        .getAllInovices()
        .then(function (response) {
          $scope.allInvoices = response.data;
          $scope.loading = false;
        })
        .catch(function (error) {
          notificationService.showMsg("Error loading invoices", "error");
          $scope.loading = false;
        });
    };
    $scope.getAllInovices();

    $scope.viewDetails = function (inv) {
      $scope.selectedInvoice = inv;
      $scope.showInvoiceModal = true;
    };

    $scope.getMedicineInfo = function(id) {
        return $scope.medicines.find(m => m.id === id);
    };

    $scope.confirmOrder = function(inv) {
      for (let item of inv.items) {
          let med = $scope.medicines.find(m => m.id === item.medicine_id);
          if (med.stock < item.qty) {
              notificationService.showMsg(med.name + "Out of Stock", "error");
              return;
          }
      }  
      inv.status = 'Delivered';

      salesService.editInvoice(inv, inv.id)
      .then(function(response){
        inv.items.forEach(item => {
          let med = $scope.medicines.find(m => m.id === item.medicine_id);
          med.stock -= item.qty;
          medicineService.editMedicine(med, med.id)
          .then(function(response){       
            // notificationService.showMsg('Medicine Edited successfully!', 'success');         
          }).catch(function(error){
            notificationService.showMsg('Error: Could not Edit medicine', 'error');
            
          })
        });
        notificationService.showMsg("Order Confirmed & Stock Updated Successfully!", "success");
        $scope.showInvoiceModal = false;
        
      }).catch(function(error){
        notificationService.showMsg("Failed to update invoice status", "error");
        console.error("Invoice Update Error:", error);
      })
    }


    $scope.getMedicine = function (id) {
      medicineService
        .getMedicine(id)
        .then(function (response) {
          return response.data[0];
        })
        .catch(function (error) {
          notificationService.showMsg(
            "Error fetching medicine details",
            "error",
          );
        });
    };
  },
);
