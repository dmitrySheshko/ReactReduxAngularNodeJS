let apiService = function(Restangular) {
    'use strict';

    let api = this;
    let rest = Restangular.all('/api');

    api.getSession = () => {
        return rest.customGET('session');
    };

    api.getUsers = page => {
        return rest.customGET('users', {page: page});
    };

    return api;
};

app.service('apiService', apiService);
apiService.$inject = ['Restangular'];