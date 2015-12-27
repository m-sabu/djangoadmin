(function () {
    var app = angular.module('intra');

    app.factory('ReportersFactory', function (Restangular, CommonService) {
        return {
            uploadMultipleExcel: function (data) {
                var url = '/api/v1/reporters/import/multiple-excel';
                var method = 'POST';
                var key = 'file';

                return CommonService.postDataWithFile(method, url, data, key);
            }
        }
    })
})();