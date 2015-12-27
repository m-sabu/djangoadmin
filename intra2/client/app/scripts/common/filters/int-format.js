(function(){
    'use strict';

    angular
        .module('novalytics')
        .filter('intFormat', function(){
            return function(value) {
                var formatted = Number(value).toFixed(0);
                if(!isNaN(formatted)){
                    return ""+formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                } else {
                    return '#';
                }
            };
        });

})();