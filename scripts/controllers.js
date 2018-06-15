'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {

        $scope.signin = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            Main.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)    
                } else {
                   // window.localStorage.setItem('token',res.data.token);
                    $localStorage.token = res.token;
                    window.location = "/";    
                }
            }, function() {
                $scope.error = 'Error al registar';
            })
        };

        $scope.signup = function() {
            var formData = {
                 firstName : $scope.firstName,
                 lastName : $scope.lastName,
                 dateOfBirth : $scope.dateOfBirth ,
                 email : $scope.email,
                 password : $scope.password,
                 confirmationPassword : $scope.password
            }

            Main.signup(formData, function(res) {
                if (res.type == false) {
                    alert(res.data);
                } else {
                    $localStorage.token = res.token;
                    window.location = "#/login";  
                }
            }, function() {
                $rootScope.error = 'Error al registar';
            })
        };

        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.logout = function() {
            Main.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
}]);
