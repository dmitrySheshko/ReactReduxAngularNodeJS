import angular from 'angular';
import AppRun from './config/app-run';

let app = angular.module('adminApp', [
    'ui.router',
    'ui.bootstrap',
    'restangular',
    'menu',
    'footer'
]).run(AppRun(Restangular, $state, apiService, storageService));