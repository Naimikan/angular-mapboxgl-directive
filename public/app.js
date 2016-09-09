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

    $scope.persistentGeojson = true;

    $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';

    /*$timeout(function () {
      $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';
    }, 6000, true);

    $timeout(function () {
      $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';
    }, 12000, true);*/

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
        },
        popup: {
          enabled: true,
          message: 'ioashiasf'
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
        },
        popup: {
          enabled: true,
          message: 'xcmlxncbknxcbn'
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
      }, {
        source: {
          data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
        }
      }
    ];
  }]);
})(window.angular, window.mapboxgl);
