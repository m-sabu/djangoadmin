(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('ReportersTotalSumListCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, $http, $modal, $stateParams){

        $scope.metric = 1;

        // DatePicker
        $scope.firstDatePicker = {
            open: function($event) {
                var self = this;

                $event.preventDefault();
                $event.stopPropagation();

                self.opened = !self.opened;
            },
            opened: false,
            minDate: '1970-01-01',
            dt: moment().subtract(1,'months').format('YYYY-MM-DD')
        };

        $scope.lastDatePicker = _.clone($scope.firstDatePicker, true);
        $scope.lastDatePicker.dt = moment().format('YYYY-MM-DD');

        $scope.clear = function () {
            $scope.firstDatePicker.dt = moment().subtract(1,'months').format('YYYY-MM-DD');
            $scope.lastDatePicker.dt = moment().format('YYYY-MM-DD');
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            formatMonth: 'MM',
            formatDay: 'dd',
            startingDay: 1
        };
        // /DatePicker


        $scope.dateChanged = function(){
            $scope.firstDatePicker.dt = moment($scope.firstDatePicker.dt).format('YYYY-MM-DD');
            $scope.lastDatePicker.dt = moment($scope.lastDatePicker.dt).format('YYYY-MM-DD');
            $scope.get();
        };

        $scope.get = function(){

            $scope.showSpinner = true;
            $scope.reporters = undefined;

            var url = '/api/v1/reporters/aggregated-sum/' + $scope.metric;

            var params = {
                first: $scope.firstDatePicker.dt,
                last: $scope.lastDatePicker.dt
            };

            $http
                .get(url, { params: params })
                .success(function(data, status, headers, config){
                    $scope.reporters = data;

                    $scope.showSpinner = false;
                })
                .error(function(data, status, headers, config){});

        };


        $scope.get();
    }

})();