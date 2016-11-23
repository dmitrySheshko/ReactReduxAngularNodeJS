import angular from 'angular';
import 'restangular';
import 'angular-ui-router';
import 'lodash';

import AppRun from './config/app-run';
import Router from './config/router';
import Location from './config/location';

import menu from './modules/menu/menu';
import footer from './modules/footer/footer';

import UsersCtrl from './components/users/users-ctrl';

import StorageService from './shared/services/storage-service';
import ApiService from './api/api';


export default angular.module('adminApp', [
    'ui.router',
    'restangular',
    menu,
    footer
])
    .run(['Restangular', '$state', 'ApiService', 'StorageService', AppRun])
    .config(Router)
    .config(Location)
    .controller('UsersCtrl', UsersCtrl)
    .service('ApiService', ApiService)
    .service('StorageService', StorageService)
    .name;