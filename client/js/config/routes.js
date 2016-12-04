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
