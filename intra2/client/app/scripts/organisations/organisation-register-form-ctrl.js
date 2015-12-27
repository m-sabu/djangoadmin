(function(){

    angular.module('intra').
        controller('OrganisationRegisterFormCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $http, $log){

        $scope.isSuccess = false;

        $scope.form = {
            isDisabled: false
        };

        $scope.register = function($event){

            $log.debug($scope.form);

            function onSuccess(data, status, headers, config){
                $scope.isSuccess = true;
            }

            function onError(data, status, headers, config){
                $scope.form.errors = data;
            }

            var url = '/api/v1/organisations';
            $http
                .post(url, $scope.form)
                .success(onSuccess)
                .error(onError);
        };

        $scope.fields = [
            { kind: 'text', name: 'first_name', 'placeholder': 'placeholder.enter_first_name' },
            { kind: 'text', name: 'last_name', 'placeholder': 'placeholder.enter_last_name' },
            { kind: 'text', name: 'cell_phone', 'placeholder': 'placeholder.enter_phone_no' },
            { kind: 'email', name: 'email', 'placeholder': 'placeholder.enter_email' },
            { kind: 'text', name: 'organisation_name', 'placeholder': 'placeholder.enter_company_name' },
            { kind: 'text', name: 'organisation_no', 'placeholder': 'placeholder.enter_organisation_no' }
        ];

    }

})();
