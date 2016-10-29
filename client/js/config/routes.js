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
            title: 'Other Page'
        })
});