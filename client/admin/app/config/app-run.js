function AppRun(Restangular, $state, ApiService, StorageService, $location) {
    Restangular.setErrorInterceptor((response) => {
        if (response.status === 401 || response.status === 403) {
            $state.go('login');
            return false;
        }
    });

    ApiService.getSession().then(owner => {
        StorageService.setData('owner', owner.plain());
        if($location.path() === '/login'){
            $state.go('main.users');
        }
    });
}
export default AppRun;