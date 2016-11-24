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

import StorageService from './shared/services/storage-service';
import ApiService from './api/api';
import UsersService from './components/users/users-service';


export default angular.module('adminApp', [
    'ui.router',
    'restangular',
    'ui.bootstrap',
    'menu',
    'footer'
])
    .run(['Restangular', '$state', 'ApiService', 'StorageService', AppRun])
    .config(Router)
    .config(Location)
    .controller('UsersCtrl', UsersCtrl)
    .service('ApiService', ApiService)
    .service('StorageService', StorageService)
    .service('UsersService', UsersService)
    .name;