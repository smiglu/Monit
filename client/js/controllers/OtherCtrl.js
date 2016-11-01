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
});
