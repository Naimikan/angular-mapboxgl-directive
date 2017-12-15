(function (angular) {
  'use strict';

  angular.module('app.Home')

  .controller('HomeController', ['$scope', function ($scope) {
    $scope.glCenter = {
      lat: 78.374,
      lng: -3.849
    };

    $scope.glZoom = {
      value: 2
    };

    $scope.glHandlers = {
      scrollZoom: false
    };
  }]);
})(window.angular);
