class AppRun {
    constructor(Restangular, $state, apiService, storageService){
        Restangular.setErrorInterceptor((response) => {
            if (response.status === 401) {
                $state.go('login');
                return false;
            }
        });

        apiService.getSession().then(owner => {
            storageService.setData('owner', owner.plain());
        });
    }
}

export default AppRun;