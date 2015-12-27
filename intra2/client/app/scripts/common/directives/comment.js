(function(){

    angular
        .module('novalytics')
        .directive('comment', function () {
            return {
                restrict: 'E',
                compile: function (element, attrs) {
                    element.remove();
                }
            }
    });

})();

