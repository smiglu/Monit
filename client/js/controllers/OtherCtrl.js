/**
 * Created by Marcin on 2016-02-12.
 */
app.controller('OtherCtrl', function ($scope, $http, $location) {

    var vm = this;
    vm.myFunc = myFunc;
    vm.init = init
    vm.makePost = makePost;

    init();

    var searchObject = $location.search();
    if (searchObject.name != undefined) {
        makePost(searchObject.name);
        init();
    }

    function init() {
        $http.get('users').then(function (response) {
            $scope.users = response.data;
        });
    }

    function makePost(value) {
        var parameter = JSON.stringify({
            name: value,
            date: new Date()
        });
        $http.post('users', parameter).
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            //console.log(data);
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    function myFunc(isValid) {
        makePost(vm.name);
        init();
    }


    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    // Create the chart
    Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random() * 100);
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },

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

        title: {
            text: 'Live random data'
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        Math.round(Math.random() * 100)
                    ]);
                }
                return data;
            }())
        }]
    });

});
