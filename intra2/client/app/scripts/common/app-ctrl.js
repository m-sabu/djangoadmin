(function(){

    angular
        .module('intra')
        .controller('AppCtrl', Ctrl);

    /* @ngInject */
    function Ctrl($scope, $rootScope, MeHelper, $state, $log, $anchorScroll){

        /*
         * Use this AppCtrl as highest level Ctrl for doing app wide stuff...
         */

        MeHelper.fetchFirst().then(
            function(response){
                $scope.me = response;
            },
            function(error){
                // Do something...
            }
        );

        $scope.logout = function(){
           MeHelper.logout();
        };

        $scope.$watch(
            function() {
                return MeHelper.isAuthenticated();
            },
            function(newVal, oldVal){
                // Update isAuthenticated and me whenever auth status changes...
                $scope.isAuthenticated = newVal;
                $scope.me = MeHelper;
                if(newVal){
                    // If newVal === true...
                    // Then do something here
                } else {
                    // Redirect to start state if user has logged out...
                    $state.go('start');
                }
            }
        );

        $scope.$on('me:change', function(event, data){
            $scope.me = data;
            $log.debug('$scope.me was updated...');
        });


        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };

        // Hide top nav in states where you want declutter UI and promote single purpose user interaction
        $scope.hasTopNav = true;
        var blacklistedStates = ['login', 'register'];
        $rootScope.$watch('$state.current.name', function(newVal, oldVal){
            newVal === 'index' ? $scope.isStartpage = true : $scope.isStartpage = false;
            $log.debug(newVal);
            $scope.hasTopNav = _.contains(blacklistedStates, newVal) ? false : true;
        });

    }

})();

