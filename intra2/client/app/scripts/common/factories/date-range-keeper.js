(function(){
    'use strict';

    angular.
        module('novalytics').
        factory('DateRangeKeeper', Factory);


    /* @ngInject */
    function Factory($rootScope, $log){

        var _dates = {
            first: moment().subtract(1,'months').format('YYYY-MM-DD'),
            last: moment().format('YYYY-MM-DD'),
        };

        var api = {
            get: function(){
                return _dates;
            },

            set: function(val){
                _dates = {
                    first: moment(val.first).format('YYYY-MM-DD'),
                    last: moment(val.last).format('YYYY-MM-DD')
                };

                $rootScope.$broadcast('DATE_RANGE:CHANGED', _dates);
            }
        };

        return api;
    }

})();