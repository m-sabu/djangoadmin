(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('ReporterSettingsCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, $http, $modal, $stateParams, TopAlertHelper){

        $scope.isDisabled = true;

        $scope.form = {};

        var url = '/api/v1/reporters/' + $stateParams.id;

        $scope.get = function(){

            function onSuccess(data, status, headers, config){
                $scope.form = data;
            }

            function onError(data, status, headers, config){}

            $http.get(url)
                .success(onSuccess)
                .error(onError);

        };

        $scope.submit = function(){

            function onSuccess(data, status, headers, config){
                TopAlertHelper.translateOne('alert.changes_saved', 'success');
                $scope.isDisabled = true;

                // Update name
                $scope.$parent.reporter.name = data.name;
            }

            function onError(data, status, headers, config){}

           $http.put(url, $scope.form)
               .success(onSuccess)
               .error(onError);
        };

        $scope.confirmRemove = function(){};

        $scope.get();

    }

})();

