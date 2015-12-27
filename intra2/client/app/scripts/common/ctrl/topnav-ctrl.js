(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('TopnavCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $http, $modal){

        $scope.showImportModal = function () {
            $scope.modalUploadInstance = $modal.open({
                templateUrl: 'modals/reports/import-excel-multiple.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });

        };

    }

})();
