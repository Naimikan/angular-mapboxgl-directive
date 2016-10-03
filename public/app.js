(function (angular, mapboxgl, undefined) {
  'use strict';

  angular.module('app', ['mapboxgl-directive'])

  .run([function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }])

  .controller('IndexController', ['$scope', '$window', '$timeout', 'mapboxglMapsData', function ($scope, $window, $timeout, mapboxglMapsData) {
    $scope.glHeight = $window.innerHeight;

    $scope.changeStyle = function () {
      $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';

      $scope.$on('mapboxglMap:styleChanged', function (event, args) {
        var layers = [
          {
            'id': 'gl-draw-polygon-fill-inactive',
            'type': 'fill',
            'filter': ['all',
              ['==', 'active', 'false'],
              ['==', '$type', 'Polygon'],
              ['!=', 'mode', 'static']
            ],
            'paint': {
              'fill-color': '#3bb2d0',
              'fill-outline-color': '#3bb2d0',
              'fill-opacity': 0.1
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-fill-active',
            'type': 'fill',
            'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
            'paint': {
              'fill-color': '#fbb03b',
              'fill-outline-color': '#fbb03b',
              'fill-opacity': 0.1
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-midpoint',
            'type': 'circle',
            'filter': ['all',
              ['==', '$type', 'Point'],
              ['==', 'meta', 'midpoint']],
            'paint': {
              'circle-radius': 3,
              'circle-color': '#fbb03b'
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-stroke-inactive',
            'type': 'line',
            'filter': ['all',
              ['==', 'active', 'false'],
              ['==', '$type', 'Polygon'],
              ['!=', 'mode', 'static']
            ],
            'layout': {
              'line-cap': 'round',
              'line-join': 'round'
            },
            'paint': {
              'line-color': '#3bb2d0',
              'line-width': 2
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-stroke-active',
            'type': 'line',
            'filter': ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
            'layout': {
              'line-cap': 'round',
              'line-join': 'round'
            },
            'paint': {
              'line-color': '#fbb03b',
              'line-dasharray': [0.2, 2],
              'line-width': 2
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-line-inactive',
            'type': 'line',
            'filter': ['all',
              ['==', 'active', 'false'],
              ['==', '$type', 'LineString'],
              ['!=', 'mode', 'static']
            ],
            'layout': {
              'line-cap': 'round',
              'line-join': 'round'
            },
            'paint': {
              'line-color': '#3bb2d0',
              'line-width': 2
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-line-active',
            'type': 'line',
            'filter': ['all',
              ['==', '$type', 'LineString'],
              ['==', 'active', 'true']
            ],
            'layout': {
              'line-cap': 'round',
              'line-join': 'round'
            },
            'paint': {
              'line-color': '#fbb03b',
              'line-dasharray': [0.2, 2],
              'line-width': 2
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
            'type': 'circle',
            'filter': ['all',
              ['==', 'meta', 'vertex'],
              ['==', '$type', 'Point'],
              ['!=', 'mode', 'static']
            ],
            'paint': {
              'circle-radius': 5,
              'circle-color': '#fff'
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-and-line-vertex-inactive',
            'type': 'circle',
            'filter': ['all',
              ['==', 'meta', 'vertex'],
              ['==', '$type', 'Point'],
              ['!=', 'mode', 'static']
            ],
            'paint': {
              'circle-radius': 3,
              'circle-color': '#fbb03b'
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-point-point-stroke-inactive',
            'type': 'circle',
            'filter': ['all',
              ['==', 'active', 'false'],
              ['==', '$type', 'Point'],
              ['==', 'meta', 'feature'],
              ['!=', 'mode', 'static']
            ],
            'paint': {
              'circle-radius': 5,
              'circle-opacity': 1,
              'circle-color': '#fff'
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-point-inactive',
            'type': 'circle',
            'filter': ['all',
              ['==', 'active', 'false'],
              ['==', '$type', 'Point'],
              ['==', 'meta', 'feature'],
              ['!=', 'mode', 'static']
            ],
            'paint': {
              'circle-radius': 3,
              'circle-color': '#3bb2d0'
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-point-stroke-active',
            'type': 'circle',
            'filter': ['all',
              ['==', '$type', 'Point'],
              ['==', 'active', 'true'],
              ['!=', 'meta', 'midpoint']
            ],
            'paint': {
              'circle-radius': 7,
              'circle-color': '#fff'
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-point-active',
            'type': 'circle',
            'filter': ['all',
              ['==', '$type', 'Point'],
              ['!=', 'meta', 'midpoint'],
              ['==', 'active', 'true']],
            'paint': {
              'circle-radius': 5,
              'circle-color': '#fbb03b'
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-fill-static',
            'type': 'fill',
            'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
            'paint': {
              'fill-color': '#404040',
              'fill-outline-color': '#404040',
              'fill-opacity': 0.1
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-polygon-stroke-static',
            'type': 'line',
            'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
            'layout': {
              'line-cap': 'round',
              'line-join': 'round'
            },
            'paint': {
              'line-color': '#404040',
              'line-width': 2
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-line-static',
            'type': 'line',
            'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
            'layout': {
              'line-cap': 'round',
              'line-join': 'round'
            },
            'paint': {
              'line-color': '#404040',
              'line-width': 2
            },
            'interactive': true
          },
          {
            'id': 'gl-draw-point-static',
            'type': 'circle',
            'filter': ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
            'paint': {
              'circle-radius': 5,
              'circle-color': '#404040'
            },
            'interactive': true
          }
        ];

        var map = args.map;

        var coldSource = map.getSource('mapbox-gl-draw-cold');
        var hotSource = map.getSource('mapbox-gl-draw-hot');

        if (!coldSource && !hotSource) {
          map.addSource('mapbox-gl-draw-cold', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection'
            }
          });

          map.addSource('mapbox-gl-draw-hot', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection'
            }
          });

          var hotLayers = angular.copy(layers).map(function (eachLayer) {
            eachLayer.id = eachLayer.id + '.hot';
            eachLayer.source = 'mapbox-gl-draw-hot';

            return eachLayer;
          });

          var coldLayers = angular.copy(layers).map(function (eachLayer) {
            eachLayer.id = eachLayer.id + '.cold';
            eachLayer.source = 'mapbox-gl-draw-cold';

            return eachLayer;
          });

          hotLayers.map(function (eachHotLayer) {
            map.addLayer(eachHotLayer);
          });

          coldLayers.map(function (eachColdLayer) {
            map.addLayer(eachColdLayer);
          });
        }
      });
    };

    $scope.$on('mapboxglMap:load', function (event, mapboxglEvent) {
      console.log(mapboxglEvent);
    });

    $window.onresize = function (event) {
      $scope.$apply(function () {
        $scope.glHeight = event.target.innerHeight;
      });
    };

    $scope.persistentGeojson = true;
    $scope.persistentImage = true;

    $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';
    $scope.glStyle2 = 'mapbox://styles/mapbox/dark-v9'

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

    $scope.$on('mapboxglDraw:draw.create', function (event, mapboxglDrawEvent) {
      console.log(event, mapboxglDrawEvent);
    });

    /*angular.element(document).ready(function () {
      var map1 = mapboxglMapsData.getMapById('map1');
      var map2 = mapboxglMapsData.getMapById('map2');

      console.log(map1, map2);

      var map = new mapboxgl.Compare(map1, map2);
    });*/

    /*$timeout(function () {
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
    }, 12000, true);*/

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
      draw: {
        enabled: true,
        options: {
          position: 'top-left'
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
