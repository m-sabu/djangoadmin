(function(){
    'use strict';

    angular.
        module('novalytics').
        factory('NovalyticsAPI', Factory);


    /* @ngInject */
    function Factory($http, Restangular){

        var api = {
            users: Restangular.all('users')
        };

        return api;
    }

})();