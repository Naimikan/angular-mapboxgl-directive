(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowGeolocateControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      geolocate: {
        enabled: true,
        options: {
          position: 'top-left'
        }
      }
    };
  }]);
})(window.angular);
