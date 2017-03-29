"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phonelist_ctrl_1 = require("./phonelist.ctrl");
var ttp = require("./views/phonelist.tpl.html");
require("./views/in.html");
var phoneList = (function () {
    function phoneList() {
        this.bindings = {
            name: "=",
            test: "<" //One Way Binding
        };
        this.controller = phonelist_ctrl_1.default;
        this.template = ttp;
        this.transclude = false;
    }
    return phoneList;
}());
exports.default = phoneList;
