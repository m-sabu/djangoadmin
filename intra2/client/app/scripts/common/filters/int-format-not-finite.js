(function(){
    'use strict';

    angular
        .module('novalytics')
        .filter('intFormatNotFinite', /* @ngInject */ function($translate){
            return function(value) {
                var formatted = Number(value).toFixed(0);
                if(!isNaN(formatted) && isFinite(formatted)){
                    return ""+formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                } else {
                    return null;
                }
            };
        });

})();