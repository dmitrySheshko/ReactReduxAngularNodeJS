import angular from 'angular';

export default angular.module('menu', [])
    .controller('MenuCtrl', ['UsersService', '$state', 'ApiService', function(UsersService, $state, ApiService) {
        let menu = this;

        menu.goToUsers = () => {
            $state.go('main.users').then(UsersService.getUsers);
        };

        menu.logout = () => {
            ApiService.logout().then(() => {
                $state.go('login');
            })
        };

    }])
    .directive('adminMenu', () => {
        return {
            restrict: 'E',
            //transclude: true,
            templateUrl: '/admin/templates/modules/menu/menu.html',
            //replace: true,
            controller: 'MenuCtrl as menu'
        }
    }).name;