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
    $scope.persistentImage = true;

    $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';

    $scope.glPopups = [
      {
        coordinates: [0, 0],
        html: '<h1>lakshfashfg</h1>'
      }, {
        coordinates: [-2, 41],
        html: '<h1>Hello World</h1>'
      }
    ];

    $scope.$on('mapboxglDirections:route', function (event, mapboxglDirectionsEvent) {
      console.log(event, mapboxglDirectionsEvent);
    });

    $scope.$on('mapboxglGeolocate:geolocate', function (event, mapboxglGeolocateEvent) {
      console.log(event, mapboxglGeolocateEvent);
    });

    $timeout(function () {
      $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';

      $scope.glCenter = {
        lat: 41,
        lng: -2
      };

      $scope.glPopups = [
        {
          coordinates: [0, 0],
          html: '<h1>lakshfashfg</h1>'
        }, {
          coordinates: [-2, 41],
          html: '<h1>Hello World</h1>'
        }, {
          coordinates: [-5, 41],
          html: '<h1>Hello World 2</h1>'
        }
      ];
    }, 6000, true);

    $timeout(function () {
      $scope.glCenter = {
        lat: 37.562984,
        lng: -122.514426
      };

      $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';
    }, 12000, true);

    $scope.glCenter = {
      lat: 37.562984,
      lng: -122.514426
      //autodiscover: true
    };

    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://placekitten.com/g/60/60/)';
    el.style.width = '60px';
    el.style.height = '60px';

    var el2 = document.createElement('div');
    el2.className = 'marker';
    el2.style.backgroundImage = 'url(https://placekitten.com/g/50/50/)';
    el2.style.width = '50px';
    el2.style.height = '50px';

    $scope.glMarkers = [
      {
        coordinates: [-3, 45],
        element: el
      }, {
        coordinates: [-2, 37],
        element: el2,
        popup: {
          coordinates: [-2, 37],
          html: '<h1>Marker with popup</h1>'
        }
      }
    ];

    $scope.glControls = {
      navigation: {
        enabled: true,
        options: {
          position: 'top-right'
        }
      },
      scale: {
        enabled: true,
        options: {
          position: 'bottom-left'
        }
      },
      geolocate: {
        enabled: true
      },
      directions: {
        enabled: true,
        options: {
          unit: 'metric'
        }
      }
    };

    $scope.glHandlers = {
      scrollZoom: true
    };

    $scope.glZoom = 2;

    $scope.glImage = [
      {
        url: 'https://www.mapbox.com/mapbox-gl-js/assets/radar.gif',
        coordinates: [
          [-80.425, 46.437],
          [-71.516, 46.437],
          [-71.516, 37.936],
          [-80.425, 37.936]
        ]
      }
    ];

    $scope.glVideo = [
      {
        urls: [
          'https://www.mapbox.com/drone/video/drone.mp4',
          'https://www.mapbox.com/drone/video/drone.webm'
        ],
        coordinates: [
          [-122.51596391201019, 37.56238816766053],
          [-122.51467645168304, 37.56410183312965],
          [-122.51309394836426, 37.563391708549425],
          [-122.51423120498657, 37.56161849366671]
        ]
      }
    ];

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
