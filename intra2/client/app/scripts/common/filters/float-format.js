(function(){
    'use strict';

    angular.module('intra').
        filter('floatFormat', function(){
            return function(val) {
                var value = parseFloat(val);
                if(angular.isDefined(value) && angular.isNumber(value) && !angular.isNaN){
                    var formatted = Number(value).toFixed(2);
                    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',');
                }
                return '0,00';
            };
        });

})();