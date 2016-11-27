class ApiService {
    constructor(Restangular){
        this.rest = Restangular.all('/api');
    }

    getSession() {
        return this.rest.customGET('session/admin');
    };

    getUsers(page) {
        return this.rest.customGET('admin/users', {page: page});
    };

    getUser(id) {
        return this.rest.one('admin/users').customGET(id);
    };

    login(obj){
        return this.rest.one('auth/login/admin').customPOST(obj);
    };

    logout(){
        return this.rest.one('auth/logout').customPOST();
    };

    editUser(user){
        return this.rest.one('admin/users').customPUT({data: user});
    }
}
ApiService.$inject = ['Restangular'];
export default  ApiService;