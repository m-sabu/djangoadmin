(function(){

    angular
        .module('intra')
        .controller('ReporterListCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $rootScope, MeHelper, Restangular, $log, $http, $modal){

        $scope.form = {};

        $scope.getReporters = function(){
            MeHelper.ready().then(function(me){
                Restangular.all('reporters').getList().then(function(reporters){
                    $scope.reporters = reporters;
                });
            });
        };

        $scope.submit = function($event){
            var url = '/api/v1/reporters';
            $log.debug($scope.form);
            $http.post(url, $scope.form).
                success(function(data, status, headers, config){
                    $scope.getReporters();
                    $scope.form = {};
                    $scope.modalInstance.close();
                }).
                error(function(data, status, headers, config){
                    $scope.form.errors = data;
                });
        };

        $scope.addReporter = function(){
            $scope.modalInstance = $modal.open({
                templateUrl: 'modals/reporters/add-reporter.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        };

        $scope.removeReporter = function(id){
            var url = '/api/v1/reporters/' + id;
            $http.delete(url).
                success(function(data, status, headers, config){
                    $scope.getTenants();
                }).
                error(function(data, status, headers, config){
                    // TODO: Create a GlobalAlertHandler
                });

        };

        $scope.getReporters();
    }

})();

