export default class MyCtrl {
  public static $inject = [
    '$scope',
  ];
  constructor (public $scope: ng.IScope) {
    $scope.greetMe = 'Dmytro';
    $scope.phones = [
      {
        name: 'Nexus S',
        snippet: 'Fast just got faster with Nexus S.'
      }, {
        name: 'Motorola XOOM™ with Wi-Fi',
        snippet: 'The Next, Next Generation tablet.'
      }, {
        name: 'MOTOROLA XOOM™',
        snippet: 'The Next, Next Generation tablet.'
      }
    ]
  }

}