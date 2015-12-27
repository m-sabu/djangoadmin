(function(){
    'use strict';

    angular
        .module('intra')
        .controller('LoginFormCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($rootScope, $scope, $state, MeHelper){

        $scope.form = {};

        $scope.submit = function(){
            MeHelper.login($scope.form).then(success, failure);

            function success(){
                MeHelper.fetchFirst().then(function(){
                    $rootScope.$broadcast('me:change', self);
                    delete $scope.form.errors;
                    $state.go('start');
                });
            }

            function failure(error){
                // If error is array then it should be considered a global error
                // Otherwise a specific form field error
                if(_.isArray(error)){
                    $scope.form.errors = { global: error };
                } else {
                    $scope.form.errors = error;
                }
            }
        };
    }

})();

