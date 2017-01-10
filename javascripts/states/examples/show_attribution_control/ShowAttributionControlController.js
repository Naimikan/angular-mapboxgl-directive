(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowAttributionControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      attribution: {
        enabled: true,
        options: {
          position: 'bottom-right'
        }
      }
    };
  }]);
})(window.angular);
