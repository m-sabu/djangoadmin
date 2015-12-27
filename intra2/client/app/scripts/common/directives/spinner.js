(function(){

    angular
        .module('novalytics')
        .directive('spinner', /* @ngInject */ function ($log) {
            return {
                restrict: 'E',
                templateUrl: 'directives/spinner.html',
                link: function (scope, elem, attrs) {

                    scope.showSpinner = true;

                    var collection = attrs.collection;

                    var watcher = scope.$watch(collection, function(){
                        if(angular.isDefined(scope[collection])){
                            scope.showSpinner = false;

                            watcher();
                        }
                    }, true);



                }
            }
    });

})();

