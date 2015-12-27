(function(){

    angular
        .module('intra')
        .controller('SegmentListCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $rootScope, MeHelper, Restangular, $log, $http, $modal, TopAlertHelper){

        $scope.form = {};

        $scope.get = function(){
            MeHelper.ready().then(function(me){
                Restangular.all('segments').getList().then(function(data){
                    $scope.segments = data;
                });
            });
        };

        $scope.submit = function($event){
            var url = '/api/v1/segments';
            $log.debug($scope.form);
            $http.post(url, $scope.form).
                success(function(data, status, headers, config){
                    $scope.get();
                    $scope.form = {};
                    $scope.modalInstance.close();

                    TopAlertHelper.translate('alert.segment_added', 'success');
                }).
                error(function(data, status, headers, config){
                    $scope.form.errors = data;
                });
        };

        $scope.add = function(){
            $scope.modalInstance = $modal.open({
                templateUrl: 'modals/segments/add-segment.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        };

        $scope.remove = function(id){
            var url = '/api/v1/segments/' + id;
            $http.delete(url).
                success(function(data, status, headers, config){
                    $scope.get();
                }).
                error(function(data, status, headers, config){
                    // TODO: Create a GlobalAlertHandler
                });

        };

        $scope.get();
    }

})();

