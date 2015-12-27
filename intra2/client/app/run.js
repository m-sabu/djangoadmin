(function(){
    'use strict';

    var app = angular.module('intra');


    // Set some basic stuff in $rootScope so that they can be accessed globally
    app.run(/* @ngInject */ function($rootScope, $state, $stateParams, $location, amMoment, $log) {
        $rootScope.location = $location;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        amMoment.changeLocale(window.CONFIG.LANGUAGE);
    });


    // Scroll to top when a state changes
    app.run(/* @ngInject */ function($rootScope, $location, $anchorScroll) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $location.hash();
            $anchorScroll();
        });
    });


    // Run some stuff when getting started
    app.run(function(MeHelper){
        MeHelper.fetchFirst();
    });

})();

