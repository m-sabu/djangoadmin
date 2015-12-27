(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('ReporterReportListCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, $http, $modal, $stateParams, $translate, SweetAlert){

        $scope.form = {};
        $scope.metric = 1;
        var baseURL = '/api/v1/reporters/' + $stateParams.id + '/reports';

        $scope.getReports = function(next){

            $log.debug(next);
            //If passed parameter next is set then use next else use default url
            var url = angular.isDefined(next) ? baseURL + next : baseURL;

            $http
                .get(url, {params: { metric: $scope.metric }})
                .success(onSuccess)
                .error(onFailure);

            function onSuccess(data, status, headers, config){
                $scope.revenueReports = data;
                $scope.revenueReports.url = url;

                // Prepare data for Highcharts
                $scope.performance = _.map($scope.revenueReports.results, function(report){
                    return [new Date(report.datetime).getTime(), parseFloat(report.value)];
                }).reverse();
            }

            function onFailure(data, status, headers, config){
            }
        };

        // DatePicker
        $scope.datePicker = {};

        $scope.today = function() {
            $scope.datePicker.dt = moment().format('YYYY-MM-DD');
        };
        $scope.today();

        $scope.clear = function () {
            $scope.datePicker.dt = null;
        };

        $scope.datePicker.minDate = '1970-01-01';

        $scope.datePicker.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datePicker.opened = true;
        };

        $scope.datePicker.dateOptions = {
            formatYear: 'yyyy',
            formatMonth: 'MM',
            formatDay: 'dd',
            startingDay: 1
        };
        // /DatePicker

        var modalTemplate = 'modals/reports/add-report.html',
            modalCtrl = 'ModalInstanceCtrl';

        $scope.add = function(){
            $scope.form = {};
            $scope.disabledDate = false;
            $scope.modalInstance = $modal.open({
                templateUrl: modalTemplate,
                controller: modalCtrl,
                scope: $scope
            });
        };

        $scope.edit = function(report){
            $scope.disabledDate = true;
            $scope.form = report;
            $scope.modalInstance = $modal.open({
                templateUrl: modalTemplate,
                controller: modalCtrl,
                scope: $scope
            });
        };

        $scope.submit = function($event){

            var url = '/api/v1/reporters/' + $stateParams.id + '/reports';

            $scope.form.date = moment($scope.datePicker.dt).format('YYYY-MM-DD');
            $scope.form.value = parseFloat($scope.form.value.replace(' ', '').replace(',', '.'));
            $scope.form.metric = $scope.metric;

            function onPostSuccess(data, status, headers, config){
                $scope.revenueReports.results.unshift(data);
                $scope.revenueReports.results = _.sortBy($scope.revenueReports.results, function(report){
                    // Sort by descending order
                    return report.timestamp;
                }).reverse();

                $scope.modalInstance.close();

                $scope.form = {};
            }

            function onPutSuccess(data, status, headers, config){
                $scope.getReports();
                $scope.modalInstance.close();
            }

            if(_.isUndefined($scope.form.id)){
                $http
                    .post(url, $scope.form)
                    .success(onPostSuccess)
                    .error();
            }
            else{
                $http
                    .put(url + '/' + $scope.form.id, $scope.form)
                    .success(onPutSuccess)
                    .error();
            }

        };

        $scope.confirmRemove = function(id){

            var keys = ['are_you_sure', 'data_will_be_erased', 'cancel', 'yes'];

            $translate(keys).then(function(translations){

                SweetAlert.swal({
                        title: translations['are_you_sure'],
                        text: translations['data_will_be_erased'],
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: translations['cancel'],
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: translations['yes'],
                        closeOnConfirm: true
                    },
                    function(isConfirm){
                        if(isConfirm){
                            $scope.remove(id);
                        }
                    });

            });

        };

        $scope.remove = function(id){

            var url = '/api/v1/reporters/' + $stateParams.id + '/reports/' + id;

            function onSuccess(data, status, headers, config){
                // Remove report point from frontend
                $scope.revenueReports.results =  _.reject($scope.revenueReports.results, { id: id });
            }

            $http
                .delete(url)
                .success(onSuccess)
                .error();
        };

        $scope.showImportModal = function(){
            $scope.modalUploadInstance = $modal.open({
                templateUrl: 'modals/reports/import-excel.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });

        };

        $scope.uploadExcel = function(files){
            var formData = new FormData();
            formData.append("file", files[0]);

            var url = '/api/v1/reporters/' + $stateParams.id + '/reports/import/excel?metric=' + $scope.metric;
            $http.post(url, formData, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            })
            .success(function(){
                $scope.modalUploadInstance.close();
                $scope.getReports();
            })
            .error();
        };

        $scope.getReports();
    }

})();