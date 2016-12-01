import angular from 'angular';

export default angular.module('menu', [])
    .controller('MenuCtrl', ['UsersService', '$state', 'ApiService', function(UsersService, $state, ApiService) {
        let menu = this;

        menu.goToSite = () => {
            window.location.href = '/';
        };

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
            templateUrl: '/admin/templates/modules/menu/menu.html',
            controller: 'MenuCtrl as menu'
        }
    }).name;