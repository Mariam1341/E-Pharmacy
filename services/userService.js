app.service('userService', function($http){
    const API_URL = "https://oihyefwdwgdkkiigrakc.supabase.co/rest/v1/users";
    const API_KEY = "sb_publishable_JjAKC5zWWQ06pIGeRFZ7Wg_VVPRQuIF";
    const Authorization = `Bearer ${API_KEY}`;

    
    const config = {
        headers: {
            "apikey": API_KEY,
            "Authorization": Authorization,
            "Content-Type": "application/json"
        }
    };

    this.getAllUsers = function(){
      return $http.get(API_URL,config);
    }
    this.getUserByEmail = function(email){
      return $http.get(`${API_URL}?email=eq.${email}`, config);
    }
    this.addUser = function(user){
      return $http.post(API_URL,user, config);
    }
    this.editUser = function(user, id){
      return $http.patch(`${API_URL}?id=eq.${id}`,user, config)
    }
    this.deleteUser = function(id){
      return $http.delete(`${API_URL}?id=eq.${id}`, config)
    }
});