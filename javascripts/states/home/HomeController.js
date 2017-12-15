(function (angular) {
  'use strict';

  angular.module('app.Home')

  .controller('HomeController', ['$scope', function ($scope) {
    $scope.glCenter = {
      autodiscover: true
    };

    $scope.glZoom = {
      value: 2
    };

    $scope.glHandlers = {
      scrollZoom: false
    };

    $scope.glControls = {
      navigation: {
        enabled: true,
        options: {
          position: 'top-left'
        }
      },
      scale: {
        enabled: true,
        options: {
          position: 'bottom-left'
        }
      }
    };
  }]);
})(window.angular);
