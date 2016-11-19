angular.module('menu', [])
    .controller('MenuCtrl', () => {

})
.directive('menu', () => {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/admin/app/modules/menu/menu.html',
            replace: true
        }
    });