/**
 * Created by Marcin on 2016-02-12.
 */
app.controller('MoistureCtrl', function ($scope, $http, $location) {

    var vm = this;
    vm.init = init;

    init();

    function comp(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    function init() {
        $http.get('moistures').then(function (response) {
            $scope.moistures = response.data;

            console.log("cos dziala?");

            $scope.moistures.sort(comp);

            var seriesOptions = [],
                seriesCounter = 0,
                names = ['CZ1', 'CZ2', 'CZ3'];


            function createChart() {

                Highcharts.stockChart('container', {

                    rangeSelector: {
                        buttons: [{
                            count: 4,
                            type: 'hour',
                            text: '4H'
                        }, {
                            count: 24,
                            type: 'hour',
                            text: '24H'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],
                        inputEnabled: false,
                        selected: 0
                    },

                    yAxis: {
                        labels: {
                            formatter: function () {
                                return (this.value > 0 ? ' + ' : '') + this.value + '%';
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },

                    chart: {
                        type: 'spline'
                    },

                    plotOptions: {
                        series: {
                            //compare: 'percent',
                            showInNavigator: true
                        }
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                        valueDecimals: 2,
                        split: true
                    },

                    series: seriesOptions
                });
            }

            $.each(names, function (i, name) {

                var data = [];
                var i2 = 0;
                for (i2 = 0; i2 < $scope.moistures.length; i2 += 1) {
                    var tajm = new Date($scope.moistures[i2].date);
                    if (i === 0) {
                        data.push([
                            tajm.getTime(),
                            parseInt($scope.moistures[i2].moisture1)
                        ]);
                    }
                    if (i === 1) {
                        data.push([
                            tajm.getTime(),
                            parseInt($scope.moistures[i2].moisture2)
                        ]);
                    }
                    if (i === 2) {
                        data.push([
                            tajm.getTime(),
                            parseInt($scope.moistures[i2].moisture3)
                        ]);
                    }


                }
                seriesOptions[i] = {
                    name: name,
                    data: data
                };


                // As we're loading the data asynchronously, we don't know what order it will arrive. So
                // we keep a counter and create the chart when all the data is loaded.
                seriesCounter += 1;

                if (seriesCounter === names.length) {
                    createChart();
                }

            });

        });
    }

});
