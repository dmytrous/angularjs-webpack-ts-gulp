import PhoneListCtrl from "./phonelist.ctrl";
import ttp = require("./views/phonelist.tpl.html");
import "./views/in.html";

export default class phoneList implements ng.IComponentOptions {
  public bindings: any;
  public controller: any;
  public template: any;
  // public templateUrl: string;
  public transclude: boolean;

  constructor () {
    this.bindings = {
      name: "=",
      test: "<"   //One Way Binding
    };
    this.controller = PhoneListCtrl;
    this.template = ttp;
    this.transclude = false;
  }

}

