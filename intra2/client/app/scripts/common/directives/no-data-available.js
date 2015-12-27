app.directive('noDataAvailable', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/no-data-available.html',
        scope: {
            'title':'@',
            'text':'@'
        }
    }
});
