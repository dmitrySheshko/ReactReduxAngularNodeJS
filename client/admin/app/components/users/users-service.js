class UsersService {
    constructor(ApiService, StorageService, $state){
        this.ApiService = ApiService;
        this.StorageService = StorageService;
        this.$state = $state;
        this.getUsers = this.getUsers.bind(this);
    }

    getUsers(callback) {
        let currentPage = this.$state.params.page || 1;
        this.ApiService.getUsers(currentPage).then(response => {
            this.setUsers(response);
            if(typeof callback === 'function') {
                callback(response.usersCount, response.currentPage);
            }
        });
    };

    setUsers(users) {
        users = users.plain();
        this.setUsersNumber(users);
        this.StorageService.setData('users', users);
    };

    setUsersNumber(users){
        let currentPage = this.$state.params.page || 1;
        let usersOnPage = 10;
        users.users.forEach((user, key) => {
            user.number = key + 1 + (currentPage * usersOnPage - usersOnPage);
        });
    }

    getUsersList() {
        return this.StorageService.state.users.users;
    };

    getUsersCount () {
        return this.StorageService.state.users.usersCount;
    };

    goToPage(page, callback) {
        if(page && page !== 1){
            this.$state.go('main.users.page', {page: page}).then(callback);
        }
        else {
            this.$state.go('main.users').then(callback);
        }
    };

    getCurrentPage() {
        return this.$state.params.page;
    };
}

UsersService.$inject = ['ApiService', 'StorageService', '$state'];
export default UsersService;