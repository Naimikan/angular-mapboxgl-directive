(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowDrawControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      draw: {
        enabled: true,
        options: {
          position: 'top-left'
        }
      }
    };
  }]);
})(window.angular);
