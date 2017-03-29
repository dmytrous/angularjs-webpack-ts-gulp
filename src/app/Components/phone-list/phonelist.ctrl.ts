export default class PhoneListCtrl {
  public name: string;
  public test: string;

  static $inject: string[] = ["$element"];

  constructor(private $element: any) {}

  public $onInit() {
    console.log("Init Component");
  }


  public $onChanges(changesObj: object) {
    //geht nur mit OneWay Bindings "<"
    console.log("Changed Obj: ");
    console.log(changesObj);
  }

  public $postLink() {
    console.log(this.$element);
  }

  public $onDestroy() { }
}