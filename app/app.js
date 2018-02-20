angular.module('app', ['ngRoute', 'ngTouch', 'ngAnimate', 'ui.bootstrap', 'ngMessages', 'cgNotify', 'LocalStorageModule', 'rzModule'])
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/', {
                templateUrl: '/views/landing.html',
                controller: 'LandingController',
                controllerAs: 'landingCtrl',
            })
            .when('/login', {
                templateUrl: '/views/loginSignup.html',
                controller: 'LoginSignupController',
                controllerAs: 'loginSignupCtrl',
            })
            .when('/validation/:token/:username', {
                templateUrl: '/views/emailConfirmation.html',
                controller: 'EmailConfirmationController',
                controllerAs: 'emailConfirmationCtrl',
            })
            .when('/passResetEmail', {
                templateUrl: '/views/passResetEmail.html',
                controller: 'PassResetEmailController',
                controllerAs: 'passResetEmailCtrl',
            })
            .when('/forget_password/:email/:token', {
                templateUrl: '/views/passReset.html',
                controller: 'PassResetController',
                controllerAs: 'passResetCtrl',
            })
            .when('/extendedSearch', {
                templateUrl: '/views/extendedSearch.html',
                controller: 'ExtendedSearchController',
                controllerAs: 'extendedSearchCtrl',
            })
            .otherwise({'template': '<h1>Route not found</h1>'})
    });

angular.module('app').factory('authInterceptor', function (AuthService) {
    return {
        request: function (config) {

            const auth = AuthService.getAuthData();

            if (config.url.match(/^http:\/\/freelance\.kolesnikdenis\.com\/api/)) {
                config.headers['Auth'] = JSON.stringify(auth);
            }
            return config;
        }
    }
});

angular.module('app').factory('authErrorInterceptor', function ($rootScope, $location, AuthService) {
    return {
        responseError: function (rejection) {
            if(rejection.status === 401) {
                $rootScope.$broadcast('unauthenticated');
                AuthService.removeAuthData();
                $location.path('/login')
            }
            return rejection;
        }
    }
});

angular.module('app').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
