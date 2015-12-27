(function(){
    'use strict';

    angular
        .module('novalytics')
        .directive("highchartsGraph", directive);

    // Usage: <highcharts-graph></highcharts-graph>

    function directive($translate, $log) {

        var options = {
            chart: {
                spacingBottom: 45,
                spacingLeft: 10,
                spacingRight: 20,
                style: {
                    color:'#a0a6a6',
                    fontFamily: 'Roboto'
                },
                zoomType: 'x',
                pinchType: 'x',
                renderTo: 'chart-container'
            },
            legend:{
                enabled: true,
                align: 'left',
                floating: true,
                y: 35,
                borderWidth: 0,
                symbolRadius: 4,
                symbolWidth: 8,
                symbolHeight: 8,
                color: '#ddd',
                itemStyle: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#a0a6a6'
                }
            },
            credits: {
                enabled: false
            },
            rangeSelector: {
                enabled: false,
                selected: 1,
                buttons: [
                    {
                        type: 'month',
                        count: 1,
                        text: '1m'
                    },
                    {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    },
                    {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    },
                    {
                        type: 'ytd',
                        text: 'YTD'
                    },
                    {
                        type: 'year',
                        count: 1,
                        text: '1y'
                    }, {
                        type: 'all',
                        text: 'All'
                    }
                ]
            },
            scrollbar: {
                enabled: true
            },
            navigator: {
                enabled: true
            },
            title : {
                text: '',
                enabled: false
            },
            xAxis:{
                type: 'datetime',
                tickPosition: 'inside'
            },
            yAxis: {
                lineWidth:1,
                lineColor: '#e1e1e1',
                gridLineDashStyle: 'Dash',
                gridLineColor: '#F1F1F1',
                tickPosition: 'outside',
                tickColor: '#e1e1e1',
                tickWidth: 1,
                title: '',
                min: 0,
                labels: {
                    x: -8,
                    y: 5,
                    align:'right'
                }
            },
            plotOptions: {
                //series: {
                //    compare: 'percent'
                //}
            },

            tooltip: {
                shared: true
            }
        };

        var palette = [
            '#a2b86c',
            '#5ca793',
            '#1395ba',
            '#117899',
            '#0f5b78',
            '#0d3c55',
            '#c02e1d',
            '#d94e1f',
            '#f16c20',
            '#ef8b2c',
            '#ecaa38',
            '#ebc844'
        ];

        return {
            link: function(scope, element, attrs) {

                // Keep track of used series that has been added already
                // Keep track of used colors from palette
                var existingColors = [],
                    existingSeriesIds = [];

                function render() {

                    scope.performanceChart = new Highcharts.Chart(options);

                    _.each(scope.graphables, function(graphable){

                        var color = palette[Math.floor(Math.random() * palette.length)];

                        scope.performanceChart.addSeries({
                            name: graphable.name,
                            data: graphable.points,
                            type: 'line',
                            dashStyle: existingSeriesIds.length > 0 ? 'LongDash' : 'Solid',
                            threshold: null,
                            tooltip: {
                                valueDecimals: 2
                            },
                            marker: {
                                enabled: false,
                                symbol: 'circle'
                            },
                            color: existingColors.length > 0 ? color : '#8f3372',
                            lineWidth: existingSeriesIds.length > 0 ? 1 : 3
                        });

                        existingSeriesIds.push(graphable.id);
                        existingColors.push(color);

                    });

                    // Default period is 3m or the highest available period if we don't have 3m
                    //var period = scope.performance.length < 90 ? 30 : 30;
                    //scope.setPeriod(period);
                }

                scope.$watch('graphables', function(list) {
                    if (_.isArray(list) && !!list.length) {
                        render();
                    }
                }, true);

            }
        };
    }


})();
