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