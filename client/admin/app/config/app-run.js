function AppRun(Restangular, $state, ApiService, StorageService) {
    Restangular.setErrorInterceptor((response) => {
        if (response.status === 401 || response.status === 403) {
            $state.go('login');
            return false;
        }
    });

    ApiService.getSession().then(owner => {
        StorageService.setData('owner', owner.plain());
        $state.go('main.users');
    });
}

export default AppRun;