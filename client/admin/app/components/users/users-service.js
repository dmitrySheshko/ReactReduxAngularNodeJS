let usersService = function(apiService, storageService){
    'use strict';
    let users = this;

    users.getUsers = () => {
        apiService.getUsers().then(users.setUsers);
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

app.service('usersService', usersService);
usersService.$inject = ['apiService', 'storageService'];