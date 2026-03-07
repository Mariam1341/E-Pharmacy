app.service('medicineService', function($http) {
    const API_URL = "https://oihyefwdwgdkkiigrakc.supabase.co/rest/v1/medicines";
    const API_KEY = "sb_publishable_JjAKC5zWWQ06pIGeRFZ7Wg_VVPRQuIF";
    const Authorization = `Bearer ${API_KEY}`;

    
    const config = {
        headers: {
            "apikey": API_KEY,
            "Authorization": Authorization,
            "Content-Type": "application/json"
        }
    };

    
    this.getAllMedicines = function(){
      return $http.get(API_URL,config);
    }
    this.addMedicine = function(medicine){
      return $http.post(API_URL,medicine, config);
    }
    this.editMedicine = function(medicine, id){
      return $http.patch(`${API_URL}?id=eq.${id}`,medicine, config)
    }
    this.deleteMedicine = function(id){
      return $http.delete(`${API_URL}?id=eq.${id}`, config)
    }
});   