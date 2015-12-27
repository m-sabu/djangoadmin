(function() {

    angular
        .module('novalytics')
        .directive('djangularPaginator', Directive);

    function getQueryVariable(url, key) {
        var query = url.split('?')[1];
        if(!!query){
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == key) {
                    return decodeURIComponent(pair[1]);
                }
            }
        }
        console.log('Query variable %s not found', key);
    }

    /* @ngInject */
    function Directive($log, $location) {
        // directive factory creates a link function
        return {
            restrict: 'E',
            templateUrl: 'directives/collection-pagination.html',
            link: function (scope, elem, attrs) {

                var collection = attrs.collection;
                scope.paginator = {};
                scope.paginator.currentPage = 1;

                scope.$watch(collection, function(){
                    if(angular.isDefined(scope[collection])){

                        scope.paginator = _.merge(scope.paginator, scope[collection]);
                        scope.results = scope[collection].results;


                        if(angular.isUndefined(initialLength)){
                            var initialLength = scope.paginator.results.length;
                        }

                        var pageCount = 0;
                        if (_.has(scope.paginator, 'count')) {
                            pageCount = parseInt( Math.ceil( scope.paginator.count / initialLength ) );
                        }
                        scope.pages = _.range(1, pageCount + 1); // +1 Due to 0 index

                        scope.paginator.currentPage = getQueryVariable(scope.paginator.url, 'page')
                        //debugger;


                        $log.debug(scope.paginator)
                    }
                }, true);

            }
        }
    }


})();
