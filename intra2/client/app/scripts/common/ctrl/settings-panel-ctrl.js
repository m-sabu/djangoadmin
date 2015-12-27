(function(){
    'use strict';

    angular
        .module('novalytics')
        .controller('SettingsPanelCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $log, $http, TopAlertHelper, $state, $stateParams, SweetAlert, $translate){

        $log.debug($scope.kind);

        $scope.isDisabled = true;

        $scope.form = {};

        var kinds = {
            reporter: {
                endpoint: '/api/v1/reporters/' + $stateParams.id,
                stateAfterRemove: 'reporters'
            },
            segment: {
                endpoint: '/api/v1/segments/' + $stateParams.id,
                stateAfterRemove: 'segments'
            }
        };

        var url = kinds[$scope.kind].endpoint;

        $scope.get = function(){

            function onSuccess(data, status, headers, config){
                $scope.form = data;
            }

            function onError(data, status, headers, config){}

            $http.get(url)
                .success(onSuccess)
                .error(onError);

        };

        $scope.submit = function(){

            function onSuccess(data, status, headers, config){
                TopAlertHelper.translateOne('alert.changes_saved', 'success');
                $scope.isDisabled = true;

                // Update name
                $scope.$parent[$scope.kind].name = data.name;
            }

            function onError(data, status, headers, config){}

           $http.put(url, $scope.form)
               .success(onSuccess)
               .error(onError);
        };

        $scope.remove = function(){

            function onSuccess(data, status, headers, config){
                $state.go(kinds[$scope.kind].stateAfterRemove);
            }

            function onError(data, status, headers, config){

            }

            $http
                .delete(url)
                .success(onSuccess)
                .error(onError);

        };

        $scope.confirmRemove = function(){

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
                            $scope.remove();
                        }
                    });

            });

        };

        $scope.get();

    }

})();

