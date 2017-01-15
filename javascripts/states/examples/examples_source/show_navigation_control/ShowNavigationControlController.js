(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowNavigationControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      navigation: {
        enabled: true,
        options: {
          position: 'top-left'
        }
      }
    };
  }]);
})(window.angular);
