angular.module('app').factory('AdsService', function($http) {
    return {
        getAll () {
            return $http.get('//freelance.kolesnikdenis.com/api/ads')
        },
        getGeoAll (body) {
            return $http.post('//freelance.kolesnikdenis.com/api/ads_geo',body)
        },
        getGeoLast () {
            return $http.get('//freelance.kolesnikdenis.com/api/ads_last')
        },
    }
});