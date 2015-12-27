var app = angular.module('intra');

// Set basic routes
app.config(/* @ngInject */ function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('index', {
            url: "",
            views: {
                "FullContentView": { templateUrl: "start.html" }
            },
            controller: 'LandingCtrl'
        })
        .state('start', {
            url: "/",
            views: {
                "FullContentView": { templateUrl: "start.html" }
            },
            controller: 'LandingCtrl'
        })
        .state('register', {
            url: "/register",
            views: {
                "FullContentView": { templateUrl: "pages/auth/register.html" }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "FullContentView": { templateUrl: "pages/auth/login.html" }
            }
        })
        .state('forgot-password', {
            url: "/forgot-password",
            views: {
                "FullContentView": { templateUrl: "pages/auth/forgot-password.html" }
            }
        })
        // How it works
        .state('how-it-works', {
            url: "/how-it-works",
            views: {
                "FullContentView": { templateUrl: "pages/how-it-works.html" }
            }
        })
        // FAQ
        .state('faq', {
            url: "/faq",
            views: {
                "FullContentView": { templateUrl: "pages/faq/landing.html" }
            }
        })
        .state('dashboard', {
            url: "/dashboard",
            views: {
                "FullContentView": { templateUrl: "dashboard/dashboard.html" }
            }
        })
        .state('about', {
            url: "/about",
            views: {
                "FullContentView": { templateUrl: "pages/about/landing.html" }
            }
        })
        .state('contact', {
            url: "/contact",
            views: {
                "FullContentView": { templateUrl: "pages/contact/landing.html" }
            }
        })
        .state('contact.feedback', {
            url: "/feedback",
            views: {
                "MainContentView": { templateUrl: "pages/contact/feedback-form.html" }
            }
        })
        .state('contact.support', {
            url: "/support",
            views: {
                "MainContentView": { templateUrl: "pages/contact/support-form.html" }
            }
        })
        .state('page-not-found', {
            url: "/404",
            views: {
                "FullContentView": { templateUrl: "404.html" }
            }
        });

    // Set a catch-all URL when no matching state can be found
    // If the url is ever invalid, e.g. '/jibberish', then redirect to '/' aka the home state
    $urlRouterProvider.otherwise('/404');

});