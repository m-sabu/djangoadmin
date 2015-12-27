(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('SummaryPanelCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, $http, Restangular, DateRangeKeeper, $translate, $modal, MeHelper){

        // Declare defaults
        $scope.graphables = [];
        $scope.metric = 1;
        $scope.me = MeHelper;

        var init = function(){

            $scope.getGraph = function(){

                function onSuccess(data, status, headers, config) {
                    // Prepare and format data for Highcharts
                    var items = data;

                    _.each(items, function(item){
                        item.points = _.map(item.graph, function (point) {
                            return [new Date(point.timestamp).getTime(), parseFloat(point.value)];
                        });
                    });

                    $scope.graphables = items;
                }

                function onFailure(data, status, headers, config) {
                    // TODO: Push error message to GlobalAlertHandler
                }

                var url = '/api/v1/organisations/graph';

                var params = {
                    metric: $scope.metric,
                    first: DateRangeKeeper.get().first,
                    last: DateRangeKeeper.get().last,
                    pks: _.union([$scope.id], _.pluck($scope.pickedOrganisations, 'id')).join(',')
                };

                $http
                    .get(url, {params: params})
                    .success(onSuccess)
                    .error(onFailure);

            };

            $scope.$watch('metric', function(){
                $scope.getGraph();
            });

            // <Orgpicker> UI Select
            $scope.organisation = {};
            $scope.organisations = [];
            $scope.pickedOrganisations = [];

            Restangular.all('organisations').getList().then(function(data){
                $scope.organisations = data;
            });

            $scope.groupByFunc = function(item){
                return $translate.instant(item.literal_kind.toLowerCase());
            };

            $scope.fetchGraph = function($item, $model){
                $log.debug($item);

                $scope.pickedOrganisations.push($item);

                $scope.organisations = _.reject($scope.organisations, { id: $item.id });

                $scope.organisation = {};
                $scope.organisation.selected = undefined;

                $scope.getGraph();
            };
            // </Orgpicker>


            $scope.getKPIs = function() {

                function onSuccess(data, status, headers, config) {
                    $scope.kpis = data;

                    $scope.firstDatePicker.dt = data.first;
                    $scope.lastDatePicker.dt = data.last;

                    $scope.revenuePerVisit = $scope.kpis.revenue / $scope.kpis.visits;
                    $scope.revenuePerWorkedHour = $scope.kpis.revenue / $scope.kpis.worked_hours;
                }

                function onFailure(data, status, headers, config) {
                    // TODO: Push error message to GlobalAlertHandler
                }

                var url = '/api/v1/organisations/' + $scope.id + '/kpi';

                var params = {
                    first: DateRangeKeeper.get().first,
                    last: DateRangeKeeper.get().last
                };

                $http
                    .get(url, {params: params})
                    .success(onSuccess)
                    .error(onFailure);

            };

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

            $scope.dateChanged = function(){
                var values = {
                    first: $scope.firstDatePicker.dt,
                    last: $scope.lastDatePicker.dt
                };
                DateRangeKeeper.set(values);
                $scope.get();
            };

            // /DatePicker

            // Load default graph for current org
            $scope.get = function(){
                $scope.getGraph();
                $scope.getKPIs();
            };

            $scope.get();
        };

        var watcher = $scope.$watch('id', function(newVal, oldValue){
            if(!!parseInt(newVal)){
                init();
                watcher();
            }
        });

    }

})();

