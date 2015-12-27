(function(){
    'use strict';

    angular
        .module('novalytics')
        .directive('summaryPanel', directive);

    /* @ngInject */
    function directive(){
        return {
            restrict: 'E',
            controller: 'SummaryPanelCtrl',
            templateUrl: 'directives/summary-panel.html',
            scope: {
                id: '@',
                kind: '@'
            }
        };
    }

})();