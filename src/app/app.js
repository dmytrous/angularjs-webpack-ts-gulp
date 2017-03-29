"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='app.d.ts' />
var angular = require("angular");
require("./core/core.module");
var app;
(function (app_1) {
    'use strict';
    app_1.app = angular.module('app', ['app.core']);
})(app || (app = {}));
