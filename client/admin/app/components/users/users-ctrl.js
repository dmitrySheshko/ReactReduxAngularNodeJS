class UsersCtrl {
    constructor($scope, UsersService){
        $scope.currentPage = 0;
        $scope.usersCount = 0;
    }

    getUsers() {
        UsersService.getUsers(this.setUsersCount);
    }

    getUsersList() {
        return UsersService.getUsersList();
    };

    changePage() {
        UsersService.goToPage($scope.currentPage);
        this.getUsers();
    };

    setUsersCount(usersCount) {
        $scope.usersCount = usersCount;
    };

    init() {
        $scope.currentPage = UsersService.getCurrentPage();
        this.getUsers();
    };

    /*let users = this;

    $scope.currentPage;
    $scope.usersCount;

    users.getUsers = () => {
        UsersService.getUsers(users.setUsersCount);
    };

    users.getUsersList = () => {
        return UsersService.getUsersList();
    };

    users.changePage = function () {
        UsersService.goToPage($scope.currentPage);
        users.getUsers();
    };

    users.setUsersCount = (usersCount) => {
        $scope.usersCount = usersCount;
    };

    users.init = () => {
        $scope.currentPage = UsersService.getCurrentPage();
        users.getUsers();
    };

    users.init();*/
}
UsersCtrl.$inject = ['$scope', 'UsersService'];