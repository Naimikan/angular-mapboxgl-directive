(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowGeocoderControlController', ['$scope', function ($scope) {
    $scope.glControls = {
      geocoder: {
        enabled: true,
        options: {
          position: 'top-left'
        }
      }
    };
  }]);
})(window.angular);
