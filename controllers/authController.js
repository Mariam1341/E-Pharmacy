app.controller('authController',function($scope, userService, $http, $location, $timeout){
    $scope.formData = {};

    $scope.register = function() {

        let user = {
            firstName:$scope.formData.firstName,
            lastName:$scope.formData.lastName,
            email: $scope.formData.email,
            password: $scope.formData.password,
            userName: $scope.formData.userName,
            phone: $scope.formData.phone,
            role: "user"
        };
   
        userService.addUser(user)
        .then(function(response){
          showMsg('User Registered Successfully','success')
        }).catch(function(error){
          console.log(error)
        });
      
    }

    $scope.login = function(){
        let user = {
            email: $scope.formData.email,
            password: $scope.formData.password,
        };
        userService.getUserByEmail(user.email)
        .then(function(response){
          let userFound = response.data[0]
          if(userFound.password == user.password){
            showMsg(`Welcome Back! ${userFound.userName}`,'success');
            
          }else{
            showMsg('User Not Found','error');

          }
          
        }).catch(function(error){
          showMsg('User Not Found','error');
        });
    }

    // sweat alert
    showMsg = function(msg, type) {
        let color = '';
        type == 'error'? color = '#ef4444' : color = '#14b8a6';
        Swal.fire({
            title: msg,
            icon: type, 
            toast: true,
            position: 'top-end', 
            showConfirmButton: false,
            timer: 3000, 
            timerProgressBar: true,
            background: '#ffffff',
            iconColor: color,
        });
    };

    
    //from this repo https://github.com/VincentGarreau/particles.js
    // Ask Chat GPT to edit it with what I want

    particlesJS('particles-js', {
    "particles": {
        "number": { "value": 15, "density": { "enable": true, "value_area": 800 } }, 
        "color": { "value": "#ffffff" },
        "shape": {
        "type": "image",
        "image": {
            "src": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHJ4PSI1IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==",
            "width": 100,
            "height": 100
        }
        },
        "opacity": { "value": 0.2, 
        "random": true}, 
        "size": { "value": 40, "random": true }, 
        "line_linked": { "enable": false }, 
        "move": { 
            "enable": true, 
            "speed": 1.5, 
            "direction": "none", 
            "random": true, 
            "straight": false, 
            "out_mode": "out", 
            "bounce": false 
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "bubble" } } 
    },
    "retina_detect": true
    });
});