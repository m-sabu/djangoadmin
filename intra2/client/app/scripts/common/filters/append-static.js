(function(){
    'use strict';

    angular.module('intra').
        filter('appendStatic', function() {
            return function(input) {
                return window.CONFIG.STATIC_URL + input;
            };
        });

})();