class ApiService {
    constructor(Restangular){
        this.rest = Restangular.all('/api');
    }

    getSession() {
        return this.rest.customGET('session/admin');
    };

    getUsers(page) {
        return this.rest.customGET('users', {page: page});
    };

    login(obj){
        return this.rest.one('auth/login/admin').customPOST(obj);
    };

    logout(){
        return this.rest.one('auth/logout').customPOST();
    };
}
ApiService.$inject = ['Restangular'];
export default  ApiService;
