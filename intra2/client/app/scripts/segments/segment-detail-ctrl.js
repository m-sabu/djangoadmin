(function(){

    angular
        .module('intra')
        .controller('SegmentDetailCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $rootScope, Restangular, $log, $http, $modal, $stateParams){

        $scope.form = {};

        $scope.editReporter = function(){
            $scope.modalInstance = $modal.open({
                templateUrl: 'modals/segments/edit-segment.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        };

        $scope.get = function(){
            Restangular.one('segments', $stateParams.id).get()
                .then(function(data){
                    $scope.segment = data;
                    $scope.form = data;
                });
        };

        $scope.get();
    }

})();

