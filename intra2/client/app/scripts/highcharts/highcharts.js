// Set defaults for Highcharts
angular.module('intra')
    .run(/* @ngInject */ function($translate){

        var keys = [
            'month_1',
            'month_2',
            'month_3',
            'month_4',
            'month_5',
            'month_6',
            'month_7',
            'month_8',
            'month_9',
            'month_10',
            'month_11',
            'month_12',
            'month_1_short',
            'month_2_short',
            'month_3_short',
            'month_4_short',
            'month_5_short',
            'month_6_short',
            'month_7_short',
            'month_8_short',
            'month_9_short',
            'month_10_short',
            'month_11_short',
            'month_12_short',
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];

        $translate(keys).then(function(translations){

            var monthsArray = [
                    translations['month_1'] || 'January',
                    translations['month_2'] || 'February',
                    translations['month_3'] || 'March',
                    translations['month_4'] || 'April',
                    translations['month_5'] || 'May',
                    translations['month_6'] || 'June',
                    translations['month_7'] || 'July',
                    translations['month_8'] || 'August',
                    translations['month_9'] || 'September',
                    translations['month_10'] || 'October',
                    translations['month_11'] || 'November',
                    translations['month_12'] || 'December'
            ];

            var monthsShortArray = [
//                    translations['month_1_short'] || 'Jan',
//                    translations['month_2_short'] || 'Feb',
//                    translations['month_3_short'] || 'Mar',
//                    translations['month_4_short'] || 'Apr',
//                    translations['month_5_short'] || 'May',
//                    translations['month_6_short'] || 'Jun',
//                    translations['month_7_short'] || 'Jul',
//                    translations['month_8_short'] || 'Aug',
//                    translations['month_9_short'] || 'Sep',
//                    translations['month_10_short'] || 'Oct',
//                    translations['month_11_short'] || 'Nov',
//                    translations['month_12_short'] || 'Dec'
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
            ];

            var weekDaysArray = [
                    translations['sunday'] || 'Sunday',
                    translations['monday'] || 'Monday',
                    translations['tuesday'] || 'Tuesday',
                    translations['wednesday'] || 'Wednesday',
                    translations['thursday'] || 'Thursday',
                    translations['friday'] || 'Friday',
                    translations['saturday'] || 'Saturday'
            ];
            Highcharts.setOptions({
                global: {
                    timezoneOffset: new Date().getTimezoneOffset()
                },
                lang: {
                    months: monthsArray,
                    shortMonths: monthsShortArray,
                    weekdays: weekDaysArray
                },
                chart: {
                    style: {
                        fontFamily: 'Roboto',
                        color:'#a0a6a6'
                    }
                },

                yAxis:{
                    labels:{
                        style:{
                            color:'#a0a6a6'
                        }
                    }
                },

                xAxis: {
                    labels: {
                        enabled:true,
                        style:{
                            color:'#a0a6a6'
                        }
                    }
                },

                legend: {
                    style:{
                        color:'#a0a6a6'
                    }
                }
            });

        });

    });
