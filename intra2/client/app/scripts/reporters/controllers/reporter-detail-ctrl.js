(function(){

    angular
        .module('intra')
        .controller('ReporterDetailCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $rootScope, Restangular, $log, $http, $modal, $stateParams){

        $scope.form = {};

        $scope.editReporter = function(){
            $scope.modalInstance = $modal.open({
                templateUrl: 'modals/landlords/tenants/edit-tenant.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        };

        $scope.getReporter = function(){
            Restangular.one('reporters', $stateParams.id).get()
                .then(function(data){
                    $scope.reporter = data;
                    $scope.form = data;
                });
        };

        $scope.getReporter();
    }

})();

