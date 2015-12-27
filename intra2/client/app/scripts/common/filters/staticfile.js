(function(){
    'use strict';

    angular.module('intra').
        filter('staticfile', function(){
            return function(val) {
                return window.CONFIG.STATIC_URL + val;
            };
        });

})();