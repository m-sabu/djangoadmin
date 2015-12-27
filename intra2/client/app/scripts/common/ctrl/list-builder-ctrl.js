(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('ListBuilderCtrl', ctrl);

    function ctrl($rootScope, $scope, MeHelper, $http, DateRangeKeeper, MetricKeeper, $log, $modal, TopAlertHelper){

        //Declare defaults
        $scope.metric = 1;

        $scope.filterable = true;

        var kinds = {
            segments: {
                endpoint: '/api/v1/segments',
                addModalTemplate: 'modals/segments/add-segment.html',
                listTemplate: 'directives/list-builder/segments-table.html',
                titleKey: 'segments'
            },
            reporters: {
                endpoint: '/api/v1/reporters',
                addModalTemplate: 'modals/reporters/add-reporter.html',
                listTemplate: 'directives/list-builder/reporters-table.html',
                titleKey: 'reporting_units'
            }
        };

        $scope.title = kinds[$scope.kind].titleKey;
        $scope.listTemplate = kinds[$scope.kind].listTemplate;

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
            var values = {
                first: $scope.firstDatePicker.dt,
                last: $scope.lastDatePicker.dt
            };
            DateRangeKeeper.set(values);
            $scope.get();
        };

        $scope.metricChanged = function(){
            var values = {
                metric: $scope.metric
            };
            DateRangeKeeper.set(values);
            $scope.get();
        };


        // Show add modal
        $scope.add = function($event){
            $scope.form = {};
            $scope.modalInstance = $modal.open({
                templateUrl: kinds[$scope.kind].addModalTemplate,
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        };

        $scope.submit = function($event){
            $log.debug($scope.form);
            var url = kinds[$scope.kind].endpoint;
            $http
                .post(url, $scope.form)
                .success(function(data, status, headers, config){
                    $scope.get();
                    $scope.form = {};
                    $scope.modalInstance.close();

                    if ($scope.kind == 'reporters'){
                        TopAlertHelper.translateOne('alert.reporting_unit_added', 'success');
                    }
                    else if ($scope.kind == 'segments'){
                        TopAlertHelper.translateOne('alert.segment_added', 'success');
                    }
                })
                .error(function(data, status, headers, config){
                    $scope.form.errors = data;
                });
        };

        $scope.get = function(){

            MeHelper.ready().then(function(me){
                var url = kinds[$scope.kind].endpoint;
                var params = {
                    metric: $scope.metric
                };

                if($scope.filterable){
                    params.first = DateRangeKeeper.get().first;
                    params.last = DateRangeKeeper.get().last;
                }

                $http
                    .get(url, {params: params})
                    .success(
                        function(data, status, headers, config){
                            $scope.items = data;
                        }
                    )
                    .error();
            });
        };

        $scope.get();

    }

})();