(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('TopAlertCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, TopAlertHelper){

        $scope.$watchCollection(
            function(){
                return TopAlertHelper.alerts;
            },
            function(newVal, oldVal){
                $scope.alerts = newVal;
            }
        );

        $scope.discardAlert = function(idx){
            TopAlertHelper.discardAlert(idx);
        };

    }

})();