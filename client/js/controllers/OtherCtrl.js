/**
 * Created by Marcin on 2016-02-12.
 */
app.controller('OtherCtrl', function ($scope, $http, $location) {

    var vm = this;
    vm.init = init;

    init();

    function init() {
        $http.get('users').then(function (response) {
            $scope.users = response.data;

            var seriesOptions = [],
                seriesCounter = 0,
                names = ['MSFT', 'AAPL', 'GOOG'];


            function createChart() {

                Highcharts.stockChart('container', {

                    rangeSelector: {
                        buttons: [{
                            count: 1,
                            type: 'minute',
                            text: '1M'
                        }, {
                            count: 5,
                            type: 'minute',
                            text: '5M'
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
                for (i2 = 0; i2 < $scope.users.length; i2 += 1) {
                    var tajm = new Date($scope.users[i2].date);
                    data.push([
                        tajm.getTime(),
                        parseInt($scope.users[i2].name) + (i * 100)
                    ]);

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
