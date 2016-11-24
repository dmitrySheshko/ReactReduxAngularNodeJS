import angular from 'angular';

export default angular.module('footer', [])
    .directive('footer', () => {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/admin/templates/modules/footer/footer.html',
            replace: true
        }
    }).name;