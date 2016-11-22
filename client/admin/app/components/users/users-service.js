let UsersService = function(apiService, storageService, $state){
    'use strict';
    let users = this;

    users.getUsers = (callback) => {
        let currentPage = $state.params.page || 1;
        apiService.getUsers(currentPage).then(response => {
            users.setUsers(response);
            if(callback) {
                callback(response.usersCount);
            }
        });
    };

    users.setUsers = users => {
        storageService.setData('users', users.plain());
    };

    users.getUsersList = () => {
        return storageService.users.users;
    };

    users.getUsersCount = () => {
        return storageService.users.usersCount;
    };

    users.goToPage = (page) => {
        if(page && page !== 1){
            $state.go('main.users.page', {page: page});
        }
        else {
            $state.go('main.users');
        }
    };

    users.getCurrentPage = () => {
        return $state.params.page;
    };

    return users;
};

app.service('UsersService', UsersService);
UsersService.$inject = ['apiService', 'storageService', '$state'];