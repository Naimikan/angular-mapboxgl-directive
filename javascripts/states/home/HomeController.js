(function (angular) {
  'use strict';

  angular.module('app.Home')

  .controller('HomeController', ['$scope', function ($scope) {
    $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';

    $scope.glCenter = {
      lat: 44.96479793033101,
      lng: 14.2685546875
    };

    $scope.glZoom = {
      value: 4
    };

    $scope.glHandlers = {
      scrollZoom: false
    };
  }]);
})(window.angular);
