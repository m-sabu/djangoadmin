(function(){
    'use strict';

    angular
        .module('novalytics')
        .directive('settingsPanel', directive);

    function directive($rootScope){
        return {
            restrict: 'E',
            controller: 'SettingsPanelCtrl',
            templateUrl: 'directives/settings-panel/container.html',
            scope: {
                kind: '@',
                id: '@'
            }
        };
    }

})();