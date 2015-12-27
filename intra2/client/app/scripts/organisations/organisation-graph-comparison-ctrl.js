(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('OrganisationGraphComparisonCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, Restangular, $http, $stateParams, $translate){

        $scope.organisation = {};
        $scope.organisations = [];

        $scope.getOrganisations = function(){
            Restangular.all('organisations').getList().then(function(data){
                $scope.organisations = data;
            });
        };

        $scope.fetchGraph = function($item, $model){
            //$log.debug($item, $model);

            // getGraph() is defined in 'OrganisationGraphCtrl'
            $scope.getGraph($item.id);
            // Reset search thru ui-select
            $scope.organisation = {};
        };

        $scope.groupByFunc = function(item){
            return $translate.instant(item.literal_kind.toLowerCase());
        };

        $scope.getOrganisations();

    }

})();

