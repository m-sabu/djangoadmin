(function(){
    'use strict';

    angular.
        module('novalytics').
        controller('UserListCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $http, Restangular, $modal, $log, MeHelper, TopAlertHelper, $translate, SweetAlert){

        $scope.getUsers = function(){
            MeHelper.ready().then(function(me){
                Restangular.all('users').getList().then(function(users){
                    $scope.users = users;
                });
            });
        };

        $scope.remove = function(user){
            user.remove().then(function(){
                $scope.users = _.without($scope.users, user);
            });
        };

        $scope.addUser = function($event){
            $scope.modalInstance = $modal.open({
                templateUrl: 'modals/users/add-user.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
        };


        $scope.form = {};
        $scope.submit = function($event){
            var url = '/api/v1/users';
            $log.debug($scope.form);
            MeHelper.ready().then(function(me) {
                $http.post(url, $scope.form).
                    success(function (data, status, headers, config) {
                        $scope.getUsers();
                        $scope.form = {};
                        $scope.modalInstance.close();

                        TopAlertHelper.add('User was successfully added!', 'success');
                    }).
                    error(function (data, status, headers, config) {
                        $scope.form.errors = data;
                    });
            });
        };

        $scope.confirmRemove = function(user){

            var keys = ['are_you_sure', 'data_will_be_erased', 'cancel', 'yes'];

            $translate(keys).then(function(translations){

                SweetAlert.swal({
                        title: translations['are_you_sure'],
                        text: translations['data_will_be_erased'],
                        type: "warning",
                        showCancelButton: true,
                        cancelButtonText: translations['cancel'],
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: translations['yes'],
                        closeOnConfirm: true
                    },
                    function(isConfirm){
                        if(isConfirm){
                            $scope.remove(user);
                        }
                    });

            });

        };

        $scope.getUsers();

    };

})();
