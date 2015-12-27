(function(){
    'use strict';

    angular.
        module('novalytics').
        config(/* @ngInject */ function($stateProvider) {

            $stateProvider
                .state('users', {
                    url: "/users",
                    views: {
                        "FullContentView": { templateUrl: "pages/users/landing.html" }
                    }
                });

        });

})();