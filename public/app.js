(function (angular, mapboxgl, undefined) {
  'use strict';

  angular.module('app', ['mapboxgl-directive'])

  .run([function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }])

  .controller('IndexController', ['$scope', '$window', '$timeout', function ($scope, $window, $timeout) {
    $scope.glHeight = $window.innerHeight;

    $window.onresize = function (event) {
      $scope.$apply(function () {
        $scope.glHeight = event.target.innerHeight;
      });
    };

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

    $scope.glHandlers = {
      scrollZoom: false
    };

    $scope.glGeojson = [
      {
        type: 'circle',
        coordinates: [-2, 41],
        layer: {
          paint: {
            "circle-radius": 15,
            "circle-color": "red",
            "circle-opacity": 0.6
          }
        }
      }, {
        type: 'circle',
        coordinates: [-4, 41],
        layer: {
          paint: {
            "circle-radius": 12,
            "circle-color": "blue",
            "circle-opacity": 0.6
          }
        }
      }, {
        type: 'line',
        coordinates: [
          [-2, 41],
          [-2.5, 41],
          [-3, 41],
          [-3.5, 41],
          [-4, 41]
        ],
        layer: {
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "green",
            "line-width": 8
          }
        }
      }
    ];
  }]);
})(window.angular, window.mapboxgl);
