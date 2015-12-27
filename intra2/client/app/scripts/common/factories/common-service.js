(function () {
    var app = angular.module('intra');

    app.service('CommonService', function (Restangular, $http) {
        return {
            postDataWithFile: function (method, path, element, key) {
                var copy = angular.copy(element);
                var strippedData = Restangular.stripRestangular(copy);
                var fd = new FormData();

                delete strippedData[key];
                _.each(strippedData, function (val, key) {
                    fd.append(key, val);
                });

                element[key] = element[key] ? element[key] : {};
                if (element[key].name) {
                    fd.append(key, element[key]);
                }

                var req = {
                    method: method,
                    url: path,
                    headers: {'Content-Type': undefined },
                    withCredentials: true,
                    transformRequest: angular.identity,
                    data: fd
                };

                return $http(req);
            }
        }
    })
})();