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
