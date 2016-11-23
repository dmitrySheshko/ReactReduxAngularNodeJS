import angular from 'angular';

export default angular.module('footer', [])
    .directive('footer', () => {
        return {
            restrict: 'E',
            templateUrl: '/admin/templates/modules/footer/footer.html'
        }
    })
    .name;