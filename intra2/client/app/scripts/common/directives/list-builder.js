(function(){
    'use strict';

    angular
        .module('novalytics')
        .directive('listBuilder', directive);

    function directive($rootScope){
        return {
            restrict: 'E',
            controller: 'ListBuilderCtrl',
            templateUrl: 'directives/list-builder/container.html',
            scope: {
                kind: '@'
            }
        };
    }

})();