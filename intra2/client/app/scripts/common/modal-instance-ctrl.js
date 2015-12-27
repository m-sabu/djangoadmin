(function(){

    angular
        .module('intra')
        .controller('ModalInstanceCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $modalInstance){

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

})();