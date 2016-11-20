let storageService = function() {
    'use strict';
    let storage = this;

    storage.owner = {};
    storage.users = {};

    storage.setData = (field, data) => {
        storage[field] = data;
    };

    storage.clearServiceField = fieldName => {
        switch(typeof storage[fieldName]){
            case 'object':
                storage[fieldName] = {};
                break;
            case 'array':
                storage[fieldName] = [];
                break;
            case 'function':
                break;
            default:
                storage[fieldName] = null;
                break;
        }
    };

    storage.clearService = () => {
        for(let field in storage){
            storage.clearServiceField(field);
        }
    };
};
app.service('storageService', storageService);
storageService.$inject = [];