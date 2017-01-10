(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowScaleControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      scale: {
        enabled: true,
        options: {
          position: 'bottom-left'
        }
      }
    };
  }]);
})(window.angular);
