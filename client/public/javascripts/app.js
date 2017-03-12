/**
 * Created by Marcin on 2016-02-11.
 */

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ui.bootstrap'
]);

/**
 * Created by Marcin on 2016-02-11.
 */
/**
 * Created by Marcin on 2016-02-13.
 */

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'pages/home.html',
            title: 'Home'
        })
        .when('/other', {
            controller: 'OtherCtrl',
            templateUrl: 'pages/other.html',
            title: 'Other Page',
            controllerAs: 'addParam'
        })
        .when('/monit', {
            controller: 'MonitCtrl',
            templateUrl: 'pages/monit.html',
            title: 'Monitoring',
            controllerAs: 'monit'
        })
        .when('/moisture', {
            controller: 'MoistureCtrl',
            templateUrl: 'pages/moisture.html',
            title: 'Wilgotnosc Gleby',
            controllerAs: 'moisture'
        })
});

/**
 * Created by Marcin on 2016-02-12.
 */
app.controller('HomeCtrl', function ($scope, $http) {


});
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

/**
 * Created by Marcin on 2016-02-12.
 */
app.controller('MonitCtrl', function ($scope, $http, $location) {

    var vm = this;
    vm.myFunc = myFunc;
    vm.init = init;
    vm.init2 = init2;
    vm.makePost = makePost;

    init();
    init2();

    var searchObject = $location.search();
    if (searchObject.name != undefined) {
        makePost(searchObject.name);
        init();
    }

    function init() {
        $http.get('users').then(function (response) {
            $scope.users = response.data;
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
                            i;

                        for (i = 0; i < $scope.users.length; i += 1) {
                            var tajm = new Date($scope.users[i].date);
                            data.push([
                                tajm.getTime(),
                                parseInt($scope.users[i].name)
                            ]);
                        }
                        return data;
                    }())
                }]
            });
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
        vm.name = "";
    }


    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    // Create the chart
    function init2() {

    }
});

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

app.directive('formGroup', function () {
    return {
        restrict: 'A',
        replace: false,
        link: function (scope, elem, attrs) {

            attrs.labelCol = attrs.labelCol || 3;
            attrs.inputCol = attrs.inputCol || 9;

            var element = angular.element(elem);

            var tplOut = '<div class="form-group"></div>';

            var tplIn = '<div class="col-sm-' + attrs.inputCol + '"></div>';

            var label = '<label for="" class="col-sm-' + attrs.labelCol + ' control-label">' + attrs.formGroup + '</label>'

            var el = element.wrap(tplOut).wrap(tplIn).parent().parent().prepend(label);

            scope.$on("$destroy", function () {
                el.remove();
            });

        }
    };
});
app.directive('acmeNavbar', function acmeNavbar() {
    var directive = {
        restrict: 'E',
        templateUrl: 'templates/navbar.html',
        scope: {
            creationDate: '='
        },
        controller: NavbarController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;

    function NavbarController() {
        var vm = this;

        // "vm.creationDate" is available by directive option "bindToController: true"
    }
});
