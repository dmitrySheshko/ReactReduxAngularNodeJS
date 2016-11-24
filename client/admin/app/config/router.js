function Router($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state({
            name: 'login',
            url: '/login',
            views: {
                'main': {
                    templateUrl: '/admin/templates/components/login/login.html'
                }
            }
        })
        .state({
            name: 'site',
            url: '',
            onEnter: () => {
                window.location.href = '/';
            }
        })
        .state({
            name: 'main',
            url: '',
            abstract: true,
            views: {
                'main': {
                    templateUrl: '/admin/templates/components/main/main.html'
                }
            }
        })
        .state({
            name: 'main.users',
            url: '/users',
            views: {
                'children': {
                    templateUrl: '/admin/templates/components/users/users.html'
                }
            }
        })
        .state({
            name: 'main.users.page',
            url: '/:page'
        });
}
Router.$inject = ['$urlRouterProvider', '$stateProvider'];
export default Router;