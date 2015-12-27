(function(){

    'use strict';

    angular
        .module('novalytics')
        .config(/* @ngInject */ function($stateProvider) {

            $stateProvider
                // List of tenants for Landlord
                .state('segments', {
                    url: "/segments",
                    views: {
                        "FullContentView": {templateUrl: "segments/landing.html"}
                    }
                })
                .state('segment', {
                    abstract: true,
                    url: "/segment/:id",
                    views: {
                        "FullContentView": {templateUrl: 'segment/landing.html'}
                    }
                })
                .state('segment.overview', {
                    url: "/overview",
                    views: {
                        "MainContentView@segment": {templateUrl: 'segment/overview.html'}
                    }
                })
                .state('segment.reporters', {
                    url: "/reporters",
                    views: {
                        "MainContentView@segment": {templateUrl: 'segment/reporters.html'}
                    }
                })
                .state('segment.settings', {
                    url: "/settings",
                    views: {
                        "MainContentView@segment": {templateUrl: 'segment/settings.html'}
                    }
                })
        });

})();
