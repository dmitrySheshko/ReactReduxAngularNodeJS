let usersCtrl = function(usersService) {
    'use strict';
    let users = this;

    users.getUsers = () => {
        usersService.getUsers();
    };

    users.init = () => {
        users.getUsers();
    };

    users.init();
};

app.controller('usersCtrl', usersCtrl);
usersCtrl.$inject = ['usersService'];