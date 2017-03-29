"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhoneListCtrl = (function () {
    function PhoneListCtrl($element) {
        this.$element = $element;
    }
    PhoneListCtrl.prototype.$onInit = function () {
        console.log("Init Component");
    };
    PhoneListCtrl.prototype.$onChanges = function (changesObj) {
        //geht nur mit OneWay Bindings "<"
        console.log("Changed Obj: ");
        console.log(changesObj);
    };
    PhoneListCtrl.prototype.$postLink = function () {
        console.log(this.$element);
    };
    PhoneListCtrl.prototype.$onDestroy = function () { };
    return PhoneListCtrl;
}());
PhoneListCtrl.$inject = ["$element"];
exports.default = PhoneListCtrl;
