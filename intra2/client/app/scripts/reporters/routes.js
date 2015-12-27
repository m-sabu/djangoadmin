(function(){

    'use strict';

    angular
        .module('novalytics')
        .config(/* @ngInject */ function($stateProvider, $urlRouterProvider) {

            $stateProvider
                // List of tenants for Landlord
                .state('reporters', {
                    url: "/reporters",
                    views: {
                        "FullContentView": {templateUrl: "reporters/landing.html"}
                    }
                })
                .state('reporter', {
                    abstract: true,
                    url: "/reporter/:id",
                    views: {
                        "FullContentView": {templateUrl: 'reporter/landing.html'}
                    }
                })
                .state('reporter.overview', {
                    url: "/overview",
                    views: {
                        "MainContentView@reporter": {templateUrl: 'reporter/overview.html'}
                    }
                })
                .state('reporter.reports', {
                    url: "/reports",
                    views: {
                        "MainContentView@reporter": {templateUrl: 'reporter/reports.html'}
                    }
                })
                .state('reporter.visits', {
                    url: "/visits",
                    views: {
                        "MainContentView@reporter": {templateUrl: 'reporter/visits.html'}
                    }
                })
                .state('reporter.settings', {
                    url: "/settings",
                    views: {
                        "MainContentView@reporter": {templateUrl: 'reporter/settings.html'}
                    }
                });
        });

})();
