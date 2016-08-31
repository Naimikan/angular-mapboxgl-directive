(function (angular, mapboxgl, undefined) {
  'use strict';

  angular.module('app', ['mapboxgl-directive'])

  .run([function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }])

  .controller('IndexController', ['$scope', function ($scope) {
    $scope.glCenter = {
      autodiscover: true
    };

    $scope.glControls = {
      navigation: {
        enabled: true,
        position: 'top-left'
      },
      scale: {
        enabled: true,
        position: 'bottom-left'
      }
    };
  }]);
})(window.angular, window.mapboxgl);
