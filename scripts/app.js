'use strict';

// declare modules
angular.module('Authentication', []);


angular.module('angularRestfulAuth', [
    'Authentication',
    'ngStorage',
    'ngRoute',
'angular-loading-bar',
    'ngCookies'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/registration', {
            controller: 'HomeCtrl',
            templateUrl: 'partials/registro.html'
        })
    
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'partials/login.html'
        })
        
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'partials/home.html'
        })
        .when('/userprofile', {
            controller: 'HomeCtrl',
            templateUrl: 'partials/userperfil.html'
        })
 
        .otherwise({ redirectTo: '/' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser ) {
                window.location="#/login";
                
            }
        });
        

    }]);

