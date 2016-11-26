class LoginCtrl {
    constructor(ApiService, $state, StorageService){
        this.ApiService = ApiService;
        this.StorageService = StorageService;
        this.$state = $state;
        this.model = {
            login: '',
            password: ''
        };
    };

    login() {
        this.ApiService.login(this.model).then(owner => {
            if(owner.role === 'admin'){
                this.StorageService.setData('owner', owner.plain());
                this.$state.go('main.users');
            }
            else {
                this.ApiService.logout();
            }
        });
    };
}

LoginCtrl.$inject = ['ApiService', '$state', 'StorageService'];
export default LoginCtrl;