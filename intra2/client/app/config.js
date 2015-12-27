(function(){
    'use strict';

    var app = angular.module('intra');


    app.config(['$translateProvider', function($translateProvider){
        //Set up the angular-translate plugin
        $translateProvider.useStaticFilesLoader({
            prefix: window.CONFIG.STATIC_URL + 'lang/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage(window.CONFIG.LANGUAGE);
    }]);


    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    }]);


    app.config(function(RestangularProvider) {
        // Set base URL
        RestangularProvider.setBaseUrl('/api/v1');

        // Empty payload on DELETE
        RestangularProvider.setRequestInterceptor(function(elem, operation) {
          if (operation === "remove") {
             return undefined;
          }
          return elem;
        });
    });

    app.config(function(uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
    });

})();