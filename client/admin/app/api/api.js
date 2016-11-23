class ApiService {
    constructor(Restangular){
        this.rest = Restangular.all('/api');
    }

    getSession() {
        return this.rest.customGET('session');
    };

    getUsers(page) {
        return this.rest.customGET('users', {page: page});
    };
}
ApiService.$inject = ['Restangular'];
export default  ApiService;
