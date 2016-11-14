(function (angular, mapboxgl, undefined) {
  'use strict';

  angular.module('app', ['mapboxgl-directive'])

  .run([function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }])

  .directive('testDirective', [function () {
    var directive = {
      restrict: 'EA',
      scope: true,
      template: '<div>Hola</div>',
      link: function ($scope, $element, $attrs) {
        console.log($scope, $element, $attrs);
      }
    };

    return directive;
  }])

  .controller('IndexController', ['$scope', '$window', '$timeout', 'mapboxglMapsData', '$compile', function ($scope, $window, $timeout, mapboxglMapsData, $compile) {
    $scope.glHeight = $window.innerHeight;

    $window.onresize = function (event) {
      $scope.$apply(function () {
        $scope.glHeight = event.target.innerHeight;
      });
    };

    $scope.persistentGeojson = true;
    $scope.persistentImage = true;

    $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';
    $scope.glStyle2 = 'mapbox://styles/mapbox/dark-v9'

    $scope.deleteButtonClick = function (event) {
      console.log(event);
    };

    var htmlButton = '<button class="btn btn-primary" ng-click="deleteButtonClick($event);">aasgioagg</button>';
    var compiledHtml = $compile(htmlButton)($scope);

    $scope.$on('mapboxglMap:load', function (event, mapboxglMapEvent) {
      console.log(event, mapboxglMapEvent);

      mapboxglMapEvent.target.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill',
        'minzoom': 15,
        'paint': {
          'fill-color': '#aaa',
          'fill-extrude-height': {
            'type': 'identity',
            'property': 'height'
          },
          'fill-extrude-base': {
            'type': 'identity',
            'property': 'min_height'
          },
          'fill-opacity': .6
        }
      });
    });

    $scope.$on('mapboxglDirections:route', function (event, mapboxglDirectionsEvent) {
      console.log(event, mapboxglDirectionsEvent);
    });

    $scope.$on('mapboxglGeolocate:geolocate', function (event, mapboxglGeolocateEvent) {
      console.log(event, mapboxglGeolocateEvent);
    });

    $scope.$on('mapboxglDraw:draw.create', function (event, mapboxglDrawEvent) {
      console.log(event, mapboxglDrawEvent);
    });

    $scope.glCenter = {
      lat: 41,
      lng: -2
    };

    /*angular.element(document).ready(function () {
      var map1 = mapboxglMapsData.getMapById('map1');
      var map2 = mapboxglMapsData.getMapById('map2');

      console.log(map1, map2);

      var map = new mapboxgl.Compare(map1, map2);
    });*/

    /*$timeout(function () {
      $scope.glCenter = {
        lat: 41,
        lng: -2
      };
    }, 6000, true);

    $timeout(function () {
      $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';
    }, 18000, true);

    $scope.glCenter = {
      lat: 37.562984,
      lng: -122.514426
      //autodiscover: true
    };*/

    $scope.glZoom = 12;

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
        element: el2
      }
    ];

    $scope.glControls = {
      navigation: {
        enabled: true,
        options: {
          position: 'top-left'
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
      }
    };

    $scope.glHandlers = {
      scrollZoom: true
    };

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

    $scope.glGeojson = {
      sources: [
        {
          id: 'circle1',
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates:  [-2, 41]
            }
          }
        }, {
          id: 'circle2',
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-4, 41]
            }
          }
        }, {
          id: 'polygon1',
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-2, 40],
                  [-2.5, 41],
                  [-3, 42],
                  [-3.5, 39],
                  [-4, 38],
                  [-2, 40]
                ]
              ]
            }
          }
        }
      ],
      layers: [
        {
          id: 'circle1',
          type: 'circle',
          source: 'circle1',
          paint: {
            'circle-radius': 15,
            'circle-color': 'red',
            'circle-opacity': 0.6
          },
          popup: {
            enabled: true,
            message: htmlButton,
            getScope: function () {
              return $scope;
            }
          }
        }, {
          id: 'circle2',
          type: 'circle',
          source: 'circle2',
          paint: {
            'circle-radius': 10,
            'circle-color': 'blue',
            'circle-opacity': 0.7
          },
          'paint.tilted': {
            'circle-opacity': 0.2
          },
          popup: {
            enabled: true,
            message: 'Test popup'
          }
        }, {
          id: 'polygon1',
          type: 'fill-extrusion',
          source: 'polygon1',
          paint: {
            /*'fill-color': 'yellow',
            'fill-opacity': 0.8*/

            'fill-extrusion-base': 0,
            'fill-extrusion-height': 1250,
            'fill-extrusion-color': 'yellow',
            'fill-extrusion-opacity': 0.75
          },
          popup: {
            enabled: true,
            message: 'Test'
          }
        }
      ]
    };

    /*$scope.glGeojson = [
      {
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
        type: 'polygon',
        coordinates: [
          [
            [-2, 40],
            [-2.5, 41],
            [-3, 42],
            [-3.5, 39],
            [-4, 38],
            [-2, 40]
          ]
        ],
        layer: {
          paint: {
            "fill-color": "#FF0000",
            "fill-opacity": 0.75
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
      }, {
        source: {
          data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
        }
      }
    ];*/
  }]);
})(window.angular, window.mapboxgl);
