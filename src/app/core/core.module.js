"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var MyCtrl_1 = require("../Controllers/MyCtrl");
var phonelist_component_1 = require("../Components/phone-list/phonelist.component");
var app;
(function (app) {
    'use strict';
    app.appCore = angular.module('app.core', [])
        .controller('MyCtrl', MyCtrl_1.default)
        .component('phoneList', new phonelist_component_1.default());
})(app || (app = {}));
