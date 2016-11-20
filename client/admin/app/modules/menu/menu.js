angular.module('menu', [])
    .controller('MenuCtrl', ['UsersService', '$state', function(UsersService, $state) {
        let menu = this;
        menu.goToUsers = () => {
            $state.go('main.users').then(UsersService.getUsers);
        }
}])
.directive('menu', () => {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/admin/app/modules/menu/menu.html',
            replace: true,
            controller: 'MenuCtrl as menu'
        }
    });