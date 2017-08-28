(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('MaxBoundsController', ['$scope', function ($scope) {
    $scope.glMaxBounds = [
      [-73.9876, 40.7661], // Southwest coordinates
      [-73.9397, 40.8002] // Northeast coordinates
    ];
  }]);
})(window.angular);
