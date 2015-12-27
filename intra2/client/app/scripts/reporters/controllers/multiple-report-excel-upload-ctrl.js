(function () {
    'use strict';

    angular
        .module('novalytics')
        .controller('MultipleReportExcelUploadCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, ReportersFactory){
        $scope.element = {};
        $scope.feedback = [];
        $scope.showUploadForm = true;

        $scope.uploadFile = function(){
            return ReportersFactory
                .uploadMultipleExcel($scope.element)
                .then(function(response){
                    $scope.feedback = response.data;
                    $scope.showUploadForm = false;
                });
        }

    }

})();