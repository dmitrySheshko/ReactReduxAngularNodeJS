import angular from 'angular';
import 'restangular';
import 'angular-ui-router';
import 'lodash';
import 'angular-ui-bootstrap';

import AppRun from './config/app-run';
import Router from './config/router';
import Location from './config/location';

import './modules/menu/menu';
import './modules/footer/footer';

import UsersCtrl from './components/users/users-ctrl';
import LoginCtrl from './components/login/login-ctrl';
import UserCtrl from './components/user/user-ctrl';
import EditUserCtrl from './components/user/modal/edit-user-ctrl';
import UserAttentionCtrl from './components/user/modal/user-attention-ctrl';

import StorageService from './shared/services/storage-service';
import ApiService from './api/api';
import UsersService from './components/users/users-service';
import UserService from './components/user/user-service';


export default angular.module('adminApp', [
    'ui.router',
    'restangular',
    'ui.bootstrap',
    'menu',
    'footer'
])
    .run(['Restangular', '$state', 'ApiService', 'StorageService', '$location', AppRun])
    .config(Router)
    .config(Location)
    .controller('LoginCtrl', LoginCtrl)
    .controller('UsersCtrl', UsersCtrl)
    .controller('UserCtrl', UserCtrl)
    .controller('EditUserCtrl', EditUserCtrl)
    .controller('UserAttentionCtrl', UserAttentionCtrl)
    .service('ApiService', ApiService)
    .service('StorageService', StorageService)
    .service('UsersService', UsersService)
    .service('UserService', UserService)
    .name;