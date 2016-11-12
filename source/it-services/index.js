import * as configs from './all.config';
import * as constants from './all.constant';
import * as components from './all.component';
import * as directives from './all.directive';
import * as services from './all.service';
import * as filters from './all.filters';

import "angular/node_modules/angular-translate/dist/angular-translate";
import "angular/node_modules/angular-sanitize/angular-sanitize";
import "angular/node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files";
import "angular/node_modules/angular-route/angular-route";

const MID = "it-services-ui";

// define angular module
const MODULE = angular.module(MID, [
    'ngSanitize',
    'ngRoute',
    'pascalprecht.translate'
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

export default MODULE;
