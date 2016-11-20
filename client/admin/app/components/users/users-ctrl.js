let UsersCtrl = function(UsersService) {
    'use strict';
    let users = this;

    users.getUsers = () => {
        UsersService.getUsers();
    };

    users.getUsersList = () => {
        return UsersService.getUsersList();
    };

    users.init = () => {
        users.getUsers();
    };

    users.init();
};

app.controller('UsersCtrl', UsersCtrl);
UsersCtrl.$inject = ['UsersService'];