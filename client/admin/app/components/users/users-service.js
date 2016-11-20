let UsersService = function(apiService, storageService, $state){
    'use strict';
    let users = this;

    users.getUsers = () => {
        apiService.getUsers($state.params.page).then(users.setUsers);
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

    return users;
};

app.service('UsersService', UsersService);
UsersService.$inject = ['apiService', 'storageService', '$state'];