app.directive('navBar', function(){
   return{
    scope: {
            isLoggedIn: '=',    
            currentUser: '=',   
            cartCount: '=',     
            showCart: '=',      
            logout: '&'         
        },
    templateUrl: 'views/directives/navbar.html'
  }
})