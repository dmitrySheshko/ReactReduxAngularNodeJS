class UsersCtrl {
    constructor($scope, UsersService){
        this.$scope = $scope;
        this.UsersService = UsersService;
        this.$scope.currentPage = 0;
        this.$scope.usersCount = 0;

        this.setUsersCount = this.setUsersCount.bind(this);
        this.getUsers = this.getUsers.bind(this);

        this.init();
    }

    getUsers() {
        this.UsersService.getUsers(this.setUsersCount);
    }

    getUsersList() {
        return this.UsersService.getUsersList();
    };

    changePage() {
        this.UsersService.goToPage(this.$scope.currentPage, this.getUsers);
    };

    setUsersCount(usersCount) {
        this.$scope.usersCount = usersCount;
    };

    init() {
        this.$scope.currentPage = this.UsersService.getCurrentPage();
        this.getUsers();
    };
}

UsersCtrl.$inject = ['$scope', 'UsersService'];
export default UsersCtrl;