/**
 * Created by Marcin on 2016-02-12.
 */
app.controller('OtherCtrl', function ($scope, $http) {

    $http.get('users').then(function (response) {
        $scope.users = response.data;
    });

});