(function(){
    'use strict';

    angular
        .module('novalytics')
        .factory('TopAlertHelper', Factory);

    /* @ngInject */
    function Factory($rootScope, $log, $translate){

        // Private vars
        var _alertTimer;

        // Public API exposed in service...
        var API = {

            alerts: [],

            add: function(message, kind){
                var self = this;

                $log.debug('GlobalAlert:', message);

                var objekt;
                if(message){
                    objekt = { message: message, kind: kind || '' };
                }
                var inAlerts = _.find(self.alerts, objekt);
                if(angular.isDefined(objekt) && angular.isUndefined(inAlerts)){
                    // self.alerts.unshift(objekt) // Show several alerts at the same time
                    self.alerts[0] = objekt; // Show one alert at a time

                    clearTimeout(_alertTimer);
                    _alertTimer = setTimeout(function(){
                        self.popLast();
                    }, 10000);
                }
            },

            popLast: function(){
                var self = this;

                if(self.alerts.length > 0){
                    self.alerts.pop();
                    $rootScope.$apply();
                }
            },

            discardAlert: function(idx){
                var self = this;

                clearTimeout(_alertTimer);
                self.alerts.splice(idx, 1);
            },

            translateOne: function(key, kind){
                var self = this;

                $translate(key).then(function(translation){
                    self.add(translation, kind);
                });
            }

        };

        return API;
    }

})();