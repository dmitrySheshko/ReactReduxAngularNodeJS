class UsersCtrl {
    constructor($scope, UsersService){
        this.$scope = $scope;
        this.UsersService = UsersService;
        this.$scope.currentPage = 0;
        this.$scope.usersCount = 0;

        this.setUsersCount = this.setUsersCount.bind(this);
        this.getUsers = this.getUsers.bind(this);

        this.getUsers();
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

    setUsersCount(usersCount, currentPage) {
        this.$scope.usersCount = usersCount;
        this.$scope.currentPage = currentPage;
    };
}

UsersCtrl.$inject = ['$scope', 'UsersService'];
export default UsersCtrl;