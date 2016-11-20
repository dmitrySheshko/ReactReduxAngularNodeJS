let app = angular.module('adminApp', [
    'ui.router',
    'ui.bootstrap',
    'restangular',
    'menu',
    'footer'
]).run((Restangular, $state, apiService, storageService) => {

    Restangular.setErrorInterceptor((response) => {
        if (response.status === 401) {
            $state.go('login');
            return false;
        }
    });

    apiService.getSession().then(owner => {
        storageService.setData('owner', owner.plain());
    });
});