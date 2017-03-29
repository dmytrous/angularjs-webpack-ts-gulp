import * as angular from 'angular';
import MyCtrl from "../Controllers/MyCtrl";
import phoneList from "../Components/phone-list/phonelist.component";
module app {
  'use strict';

  export let appCore: ng.IModule = angular.module('app.core', [])
    .controller('MyCtrl', MyCtrl)
    .component('phoneList', new phoneList())
}

