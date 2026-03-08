app.controller('medicineController',function($scope, medicineService, notificationService ){
  $scope.medicines = [];
  $scope.loading = true;
  $scope.isModalOpen = false; 
  $scope.isEditMode = false;
  $scope.newMed = {};

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
 
  $scope.openAddModal = function() {
      $scope.tempMed = {}; 
      $scope.isModalOpen = true;
  };

  $scope.closeModal = function() {
      $scope.isModalOpen = false;
  };

  
  $scope.saveOrEditMedicine = function() {         
      $scope.newMed.isDeleted = false;
      if($scope.isEditMode){
        medicineService.editMedicine($scope.newMed, $scope.newMed.id)   
      .then(function(response){       
        notificationService.showMsg('Medicine Updated successfully!', 'success');  
        $scope.getAllMedicines();
        $scope.isModalOpen = false;         
      }).catch(function(error){
        notificationService.showMsg('Error: Could not Update medicine', 'error');
        
      })
      }else{
      medicineService.addMedicine($scope.newMed)   
      .then(function(response){       
        notificationService.showMsg('Medicine added successfully!', 'success');  
        $scope.getAllMedicines();
        $scope.isModalOpen = false;         
      }).catch(function(error){
        notificationService.showMsg('Error: Could not Add medicine', 'error');        
      })
      }
      
  };

  $scope.editMedicine = function(med){
    $scope.isEditMode = true;
    $scope.openAddModal();
    $scope.newMed = med;

  }

  $scope.deleteMedicine = function(med){
      notificationService.confirm('Delete Confirmation',
        'Are you sure you want to delete ' + med.name + '?', 'warning', 'Yes, Delete')
        .then(function(result){

          if(result.isConfirmed){

            //Soft Delete
            med.isDeleted = true;
            medicineService.editMedicine(med, med.id)
            .then(function(response){
              notificationService.showMsg('Medicine has been deleted successfuly', 'success');  
            }).catch(function(error){
              notificationService.showMsg('Error: Could not delete medicine', 'error');
            })

            // Hard Delete

            // medicineService.deleteMedicine(med.id)
            // .then(function(response){
            //   showAllCustomers();
            //   notificationService.showMsg('Medicine has been deleted successfuly', 'success');          
            // }).catch(function(error){
            //   notificationService.showMsg('Error: Could not delete medicine', 'error');
            // });
          }
        })    
    }
});

// .then(function(response){

//   }).catch(function(error){
    
//   })