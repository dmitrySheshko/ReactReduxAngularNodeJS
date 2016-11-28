function Router($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state({
            name: 'login',
            url: '/login',
            views: {
                main: {
                    templateUrl: '/admin/templates/components/login/login.html'
                }
            }
        })
        .state({
            name: 'main',
            url: '',
            abstract: true,
            views: {
                main: {
                    templateUrl: '/admin/templates/components/main/main.html'
                }
            }
        })
        .state({
            name: 'main.users',
            url: '/users',
            views: {
                children: {
                    templateUrl: '/admin/templates/components/users/users.html'
                }
            }
        })
        .state({
            name: 'main.users.page',
            url: '/:page'
        })
        .state({
            name: 'main.user',
            url: '/user',
            views: {
                children: {
                    templateUrl: '/admin/templates/components/user/user.html'
                }
            }
        })
        .state({
            name: 'main.user.id',
            url: '/:id'
        });
}
Router.$inject = ['$urlRouterProvider', '$stateProvider'];
export default Router;