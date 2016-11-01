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
 * Created by Marcin on 2016-02-12.
 */
app.controller('HomeCtrl', function ($scope, $http) {


});
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
});

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