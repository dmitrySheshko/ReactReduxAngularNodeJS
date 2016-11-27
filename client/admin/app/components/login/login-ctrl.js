import validation from '../../../../common/validations/login';

class LoginCtrl {
    constructor(ApiService, $state, StorageService){
        this.ApiService = ApiService;
        this.StorageService = StorageService;
        this.$state = $state;
        this.model = {
            login: '',
            password: ''
        };
        this.errors = {};
    };

    login() {
        if(this.isValid()){
            this.ApiService.login(this.model).then(owner => {
                if(owner.role === 'admin'){
                    this.StorageService.setData('owner', owner.plain());
                    this.$state.go('main.users');
                }
                else {
                    this.ApiService.logout();
                }
            });
        }
    };

    isValid() {
        this.errors = {};
        const { errors, isValid } = validation(this.model);
        if (!isValid) {
            this.errors = errors;
        }
        return isValid;
    }
}

LoginCtrl.$inject = ['ApiService', '$state', 'StorageService'];
export default LoginCtrl;