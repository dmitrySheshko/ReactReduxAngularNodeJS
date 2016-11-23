function AppRun(Restangular, $state, ApiService, StorageService) {
    Restangular.setErrorInterceptor((response) => {
        if (response.status === 401) {
            $state.go('login');
            return false;
        }
    });

    ApiService.getSession().then(owner => {
        StorageService.setData('owner', owner.plain());
    });
}

export default AppRun;