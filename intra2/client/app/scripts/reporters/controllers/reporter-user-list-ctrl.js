(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('ReporterUserListCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, $http, $modal, $stateParams, TopAlertHelper){

        $scope.getUsers = function(){
            var url = '/api/v1/reporters/' + $stateParams.id + '/users';
            $http
                .get(url)
                .success(onSuccess)
                .error(onFailure);

            function onSuccess(data, status, headers, config){
                $scope.users = data;
            }

            function onFailure(data, status, headers, config){
            }
        };

        $scope.addUser = function($event){
            // Reset form
            $scope.form = {};

            $scope.modalInstance = $modal.open({
                templateUrl: 'modals/tenant/add-user.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        };

        $scope.submit = function($event){
            var url = '/api/v1/reporters/' + $stateParams.id + '/users';
            $log.debug($scope.form);
            $http.post(url, $scope.form).
                success(function(data, status, headers, config){
                    $scope.getUsers();
                    $scope.form = {};
                    $scope.modalInstance.close();

                    TopAlertHelper.add('User was successfully added!', 'success');
                }).
                error(function(data, status, headers, config){
                    $scope.form.errors = data;
                });
        };

        $scope.getUsers();
    }

})();

