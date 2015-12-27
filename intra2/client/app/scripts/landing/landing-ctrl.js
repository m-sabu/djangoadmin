(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('LandingCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, MeHelper, $state){

        MeHelper.fetchFirst().then(function(){
            if (MeHelper.isAuthenticated() && MeHelper.getActiveUser().organisation.literal_kind === 'COLLECTOR'){
                $log.debug('going to tenants from landing...');
                $state.go('dashboard');
            }
            else if (MeHelper.isAuthenticated() && MeHelper.getActiveUser().organisation.literal_kind === 'REPORTER'){

                $state.go('reporter.overview', {id: MeHelper.getActiveOrganisation().id});
            }
            return;
        })
    }

})();

