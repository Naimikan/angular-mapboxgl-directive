(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowDirectionsControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      directions: {
        enabled: true,
        options: {
          position: 'top-left',
          accessToken: mapboxgl.accessToken
        }
      }
    };
  }]);
})(window.angular);
