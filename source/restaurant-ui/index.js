import * as configs from './all.config';
import * as constants from './all.constant';
import * as components from './all.component';
import * as directives from './all.directive';
import * as services from './all.service';
import * as filters from './all.filters';
import MainController from './config/MainController';

import "angular/node_modules/angular-translate/dist/angular-translate";
import "angular/node_modules/angular-sanitize/angular-sanitize";
import "angular/node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files";
import "angular/node_modules/angular-route/angular-route";
import "angular/node_modules/angular-cookies/angular-cookies";
import "angular/node_modules/angular-local-storage/dist/angular-local-storage";
import "angular/node_modules/angular-ui-switch/angular-ui-switch";
import "angular/node_modules/angular-bootstrap/ui-bootstrap-tpls-1.3.3";

const MID = "restaurant-ui";

// define angular module
const MODULE = angular.module(MID, [
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'pascalprecht.translate',
    'LocalStorageModule',
    'uiSwitch'
]);

// iterates through all exported configs and register them
for (let id in configs) {
    MODULE.config(configs[id]);
}

// iterates through all exported constants and register them
for (let id in constants) {
    MODULE.constant(id, constants[id]);
}

// iterates through all exported services and register them
for (let id in services) {
    MODULE.service(id, services[id]);
}

// iterates through all exported components and register them
for (let id in components) {
    MODULE.component(id, components[id]);
}

// iterates through all exported directives and register them
for (let id in directives) {
    MODULE.directive(id, directives[id]);
}

// iterates through all exported filters and register them
for (let id in filters) {
    MODULE.filter(id, filters[id]);
}

//Init main controller
MODULE.controller('MainController', MainController);

export default MODULE;
