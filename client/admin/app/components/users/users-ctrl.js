let UsersCtrl = function($scope, UsersService) {
    'use strict';
    let users = this;

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

    users.init();
};

app.controller('UsersCtrl', UsersCtrl);
UsersCtrl.$inject = ['$scope', 'UsersService'];