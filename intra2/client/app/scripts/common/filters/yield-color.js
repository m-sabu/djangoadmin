(function(){

    angular
        .module('novalytics')
        .filter('yieldColor', function () {
            return function (rawNumber) {
                var num = parseFloat(rawNumber);
                var output;

                if (angular.isNumber(num)){
                    if (num > 0) {
                        output = 'plus';
                    } else if(num < 0) {
                        output = 'minus';
                    } else if(num == 0) {
                        output = '';
                    } else {
                        output = '';
                    }
                } else {
                    console.error(num, 'is not a number!');
                    output = '';
                }

                return output;
            };
        });

})();