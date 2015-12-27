(function(){

    angular
        .module('intra')
        .controller('OrganisationWrapperCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $http, MeHelper, $log){

        $scope.setActiveOrganisation = function(id){
            var url = '/api/v1/me/organisation-users/' + id;

            function onSuccess(data, status, headers, config){
                location.reload();
            }

            function onError(data, status, headers, config){
                // TODO: Show something went wrong error ...
            }

            $http.put(url).success(onSuccess).error(onError);
        };

    }

})();

