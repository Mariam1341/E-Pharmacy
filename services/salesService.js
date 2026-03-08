app.service('salesService',function($http){
  const API_URL = "https://oihyefwdwgdkkiigrakc.supabase.co/rest/v1/invoices";
    const API_KEY = "sb_publishable_JjAKC5zWWQ06pIGeRFZ7Wg_VVPRQuIF";
    const Authorization = `Bearer ${API_KEY}`;

    
    const config = {
        headers: {
            "apikey": API_KEY,
            "Authorization": Authorization,
            "Content-Type": "application/json"
        }
    };

    this.getAllInovices = function(){
      return $http.get(API_URL,config);
    }
    this.addInovice = function(inovice){
      return $http.post(API_URL,inovice, config);
    }
    this.editInvoice = function(inovice, id){
      return $http.patch(`${API_URL}?id=eq.${id}`,inovice, config)
    }
    this.deleteInovice = function(id){
      return $http.delete(`${API_URL}?id=eq.${id}`, config)
    }
    this.getInvoiceByUser = function(userName){
      return $http.get(`${API_URL}?customerName=eq.${userName}`, config);
    }
});