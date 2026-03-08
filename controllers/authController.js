app.controller(
  "authController",
  function ($scope, userService, notificationService, $location, $timeout) {
    $scope.formData = {};

    $scope.register = function () {
      let user = {
        firstName: $scope.formData.firstName,
        lastName: $scope.formData.lastName,
        email: $scope.formData.email,
        password: $scope.formData.password,
        userName: $scope.formData.userName,
        phone: $scope.formData.phone,
        role: "user",
      };

      userService
        .addUser(user)
        .then(function (response) {
          notificationService.showMsg(
            "User Registered Successfully",
            "success",
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              userName: user.userName,
              phone: user.phone,
              role: "user",
            }),
          );
          $timeout(function () {
            $location.path("/home");
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    localStorage.clear(); 

    $scope.login = function () {
  
      let user = {
        email: $scope.formData.email,
        password: $scope.formData.password,
      };
      userService
        .getUserByEmail(user.email)
        .then(function (response) {
          let userFound = response.data[0];
          if (userFound.password == user.password) {
            notificationService.showMsg(
              `Welcome Back! ${userFound.userName}`,
              "success",
            );
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: userFound.id,
                firstName: userFound.firstName,
                lastName: userFound.lastName,
                email: userFound.email,
                userName: userFound.userName,
                phone: userFound.phone,
                role: userFound.role,
              }),
            );
            userFound.role === "admin"
              ? $timeout(function () {
                  $location.path("/admin/customers");
                },2000)
              : $timeout(function () {
                  $location.path("/home");
                }, 2000);
          } else {
            notificationService.showMsg("User Not Found", "error");
          }
        })
        .catch(function (error) {
          notificationService.showMsg("User Not Found", "error");
        });
    };

    // $scope.logout = function(){
    //   console.log('hello')
    //   localStorage.clear(); 
    //   notificationService.showMsg("Logged out successfully!", "success");
    // }

    //from this repo https://github.com/VincentGarreau/particles.js
    // Ask Chat GPT to edit it with what I want

    particlesJS("particles-js", {
      particles: {
        number: { value: 15, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
          type: "image",
          image: {
            src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHJ4PSI1IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==",
            width: 100,
            height: 100,
          },
        },
        opacity: { value: 0.2, random: true },
        size: { value: 40, random: true },
        line_linked: { enable: false },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "bubble" } },
      },
      retina_detect: true,
    });
  },
);
