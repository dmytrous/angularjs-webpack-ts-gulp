"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyCtrl = (function () {
    function MyCtrl($scope) {
        this.$scope = $scope;
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
        ];
    }
    return MyCtrl;
}());
MyCtrl.$inject = [
    '$scope',
];
exports.default = MyCtrl;
