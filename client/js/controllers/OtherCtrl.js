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
        });
    }

});
