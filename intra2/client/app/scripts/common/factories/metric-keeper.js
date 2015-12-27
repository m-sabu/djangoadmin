(function(){
    'use strict';

    angular.
        module('novalytics').
        factory('MetricKeeper', Factory);


    /* @ngInject */
    function Factory($rootScope, $log){

        // Private vars
        var _data = {
            metric: 1
        };

        var api = {
            get: function(){
                return _data;
            },

            set: function(val){
                _data = {
                    metric: val.metric
                };

                $rootScope.$broadcast('METRIC:CHANGED', _data);
            }
        };

        return api;
    }

})();