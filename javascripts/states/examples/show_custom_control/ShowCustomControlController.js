(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowCustomControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      custom: [
        {
          constructor: CustomControl,
          name: 'CustomControl1',
          options: {},
          events: [],
          listenInMap: false
        }
      ]
    };
  }]);
})(window.angular);
