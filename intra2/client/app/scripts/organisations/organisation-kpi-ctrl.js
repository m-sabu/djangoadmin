(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('OrganisationKPICtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, $http, $stateParams){

        $scope.get = function(id){

            function onSuccess(data, status, headers, config) {
                // Prepare and format data for Highcharts
                $scope.kpis = data;

                $scope.firstDatePicker.dt = data.first;
                $scope.lastDatePicker.dt = data.last;
            }

            function onFailure(data, status, headers, config) {
                // TODO: Push error message to GlobalAlertHandler
            }

            var url = '/api/v1/organisations/' + id + '/kpi';

            $http
                .get(url)
                .success(onSuccess)
                .error(onFailure);

        };

        // Load default graph for current tenant
        $scope.get($stateParams.id);

    }

})();

