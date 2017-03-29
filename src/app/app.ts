/// <reference path='app.d.ts' />
import * as angular from 'angular';
import './core/core.module';

module app {
  'use strict';

  export let app: ng.IModule = angular.module('app', [ 'app.core'])
}