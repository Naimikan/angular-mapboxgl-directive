(function (angular, mapboxgl, turf, undefined) {
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

  .controller('IndexController', ['$scope', '$window', '$timeout', 'mapboxglMapsData', '$compile', 'version', function ($scope, $window, $timeout, mapboxglMapsData, $compile, version) {
    $scope.glHeight = $window.innerHeight;
    $scope.glWidth = $window.innerWidth;
    // $scope.glHeight = '450px';
    // $scope.glWidth = '450px';

    $window.onresize = function (event) {
      $scope.$apply(function () {
        $scope.glHeight = event.target.innerHeight;
        $scope.glWidth = event.target.innerWidth;
      });
    };

    $scope.onClick = function () {
      $scope.glWidth = {
        value: $window.innerWidth,
        animation: {
          enabled: true,
          transitionTime: 500
        }
      };
    };

    $scope.addMarker = function (map) {
      map.sources[0].data.features.push({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [2, 41]
        }
      });
    };

    $scope.maps = [
      {
        id: 'firstMap',
        controls: {
          navigation: {
            enabled: true,
            options: {
              position: 'top-left'
            }
          }
        },
        sources: [
          {
            id: 'source1',
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0]
                  }
                }
              ]
            }
          }
        ],
        layers: [
          {
            id: 'layer1',
            type: 'circle',
            source: 'source1',
            paint: {
              'circle-radius': 5,
              'circle-color': '#FFA222'
            }
          }
        ]
      }, {
        id: 'secondMap',
        controls: {
          scale: {
            enabled: true,
            options: {
              position: 'bottom-left'
            }
          }
        },
        sources: [
          {
            id: 'source1',
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [2, 2]
                  }
                }
              ]
            }
          }
        ],
        layers: [
          {
            id: 'layer1',
            type: 'circle',
            source: 'source1',
            paint: {
              'circle-radius': 5,
              'circle-color': '#FF12A2'
            }
          }
        ]
      }, {
        id: 'thirdMap',
        controls: {
          attribution: {
            enabled: true,
            options: {
              compact: true
            }
          }
        },
        sources: [
          {
            id: 'source1',
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [6, 6]
                  }
                }
              ]
            }
          }
        ],
        layers: [
          {
            id: 'layer1',
            type: 'circle',
            source: 'source1',
            paint: {
              'circle-radius': 5,
              'circle-color': '#FF87A2'
            }
          }
        ]
      }
    ];

    $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';
    $scope.glStyle2 = 'mapbox://styles/mapbox/streets-v9'

    // $timeout(function () {
    //   $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';
    // }, 6000, true);

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
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': {
            'type': 'identity',
            'property': 'height'
          },
          'fill-extrusion-base': {
            'type': 'identity',
            'property': 'min_height'
          },
          'fill-extrusion-opacity': .6
        }
      });
    });

    $scope.$on('mapboxglMap:styleChanged', function (event, mapboxglMapEvent) {
      console.log(event, mapboxglMapEvent);
    });

    $scope.$on('mapboxglDirections:route', function (event, mapboxglDirectionsEvent) {
      console.log(event, mapboxglDirectionsEvent);
    });

    $scope.$on('mapboxglGeolocate:geolocate', function (event, mapboxglGeolocateEvent) {
      console.log(event, mapboxglGeolocateEvent);
    });

    $scope.$on('mapboxglGeocoder:loading', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:results', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:result', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:error', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglDraw:draw.create', function (event, mapboxglDrawEvent) {
      console.log(event, mapboxglDrawEvent);
    });

    $scope.glCenter = {
      lat: 41,
      lng: -2
    };

    /*$timeout(function () {
      $scope.glStyle = 'mapbox://styles/mapbox/streets-v9';
      $scope.glStyle2 = 'mapbox://styles/mapbox/streets-v9';
    }, 6000, true);*/

    $scope.glZoom = {
      value: 0
    };

    $scope.glPopups = {
      coordinates: [-99, 19],
      message: 'Popup using glPopups directive'
    };

    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://placekitten.com/g/60/60/)';
    el.style.width = '60px';
    el.style.height = '60px';
    el.style.cursor = 'pointer';

    var el2 = document.createElement('div');
    el2.className = 'marker';
    el2.style.backgroundImage = 'url(https://placekitten.com/g/50/50/)';
    el2.style.width = '50px';
    el2.style.height = '50px';
    el2.style.cursor = 'pointer';

    $scope.glMarkers = [
      {
        coordinates: [-3, 45],
        element: el,
        options: {
          offset: [-25, -25]
        },
        popup: {
          enabled: true,
          message: '<div test-directive></div>',
          getScope: function () {
            return $scope;
          },
          options: {
            offset: 35
          }
        }
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
      attribution: {
        enabled: true,
        options: {
          compact: true
        }
      },
      geocoder: {
        enabled: true,
        options: {
          accessToken: mapboxgl.accessToken
        }
      },
      geolocate: {
        enabled: true
      },
      fullscreen: {
        enabled: true,
        options: {
          position: 'top-right'
        }
      },
      language: {
        enabled: true,
        options: {
          defaultLanguage: 'fr'
        }
      }
    };

    $scope.glHandlers = {
      scrollZoom: true
    };

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

    $scope.glSources = [];
    $scope.glLayers = [];

    var features = [];
    var counter = 0;

    var colors = ['#0DAAFF', '#FF620D'];
    var routes = [
      {
        origin: [-122.414, 37.776],
        destination: [-77.032, 38.913]
      }, {
        origin: [-2.15, 41.776],
        destination: [-77.032, 38.913]
      }
    ];

    features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: routes[0].origin
        },
        properties: {
          radius: 8,
          animation: {
            enabled: false,
            animationData: {
              origin: routes[0].origin,
              destination: routes[0].destination,
              speed: 5,
              speedUnit: 'meters'
            },
            animationFunction: function (map, sourceId, featureId, feature, animationData, deltaTime, end) {
              var arc = [];

              var route = {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [feature.geometry.coordinates, animationData.destination]
                }
              };

              // Calculate the distance in kilometers between route start/end point.
              var lineDistance = turf.lineDistance(route, animationData.speedUnit);
              var segment = feature.geometry.coordinates;

              if (lineDistance > 0) {
                segment = turf.along(route, animationData.speed, animationData.speedUnit);
              }

              feature.properties.radius = Math.cos(deltaTime / 500) * 20 < 5 ? 5 : Math.cos(deltaTime / 500) * 20;

              feature.geometry.coordinates = segment.geometry.coordinates;

              if (feature.geometry.coordinates[0] >= animationData.destination[0]) {
                console.log('end');
                end();
              }

              // feature.geometry.coordinates[0] += 0.1;
              // feature.geometry.coordinates[1] += 0.05;
              //
              // if (timestamp >= 8000) {
              //    end();
              // }
            }
          }
        }
      }
    ];


    // for (var iterator = 0; iterator < 2; iterator++) {
    //   /*var tempLng = (Math.random() * (180 - (-180)) + 180).toFixed(5) * 1;
    //   var tempLat = (Math.random() * (90 - (-90)) + 90).toFixed(5) * 1;
    //
    //   var tempLng2 = (Math.random() * (180 - (-180)) + 180).toFixed(5) * 1;
    //   var tempLat2 = (Math.random() * (90 - (-90)) + 90).toFixed(5) * 1;*/
    //
    //   features.push({
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: angular.copy(routes[iterator].origin)
    //       //coordinates: [tempLng, tempLat]
    //     },
    //     properties: {
    //       //lattitude: tempLat,
    //       //longitude: tempLng,
    //       animation: {
    //         enabled: true,
    //         animationData: {
    //           origin: angular.copy(routes[iterator].origin),
    //           destination: angular.copy(routes[iterator].destination),
    //           generateRoute: function (newOrigin, newDestination) {
    //             var arc = [];
    //
    //             var route = {
    //               type: 'Feature',
    //               geometry: {
    //                 type: 'LineString',
    //                 coordinates: [newOrigin, newDestination]
    //               }
    //             };
    //
    //             // Calculate the distance in kilometers between route start/end point.
    //             var lineDistance = turf.lineDistance(route, 'meters');
    //
    //             if (lineDistance > 0) {
    //               // Draw an arc between the `origin` & `destination` of the two points
    //               for (var i = 0; i < lineDistance; i++) {
    //                 var segment = turf.along(route, i / 1000 * lineDistance, 'meters');
    //                 arc.push(segment.geometry.coordinates);
    //               }
    //
    //               // Update the route with calculated arc coordinates
    //               route.geometry.coordinates = arc;
    //             }
    //
    //             return route;
    //           }
    //         },
    //         animationFunction: function (map, sourceId, featureId, feature, animationData, timestamp, end) {
    //           feature.geometry.coordinates[0] += 1;
    //           feature.geometry.coordinates[1] += 0.05;
    //
    //           console.log(feature.geometry.coordinates[0]);
    //
    //           if (feature.geometry.coordinates[0] >= 100) {
    //             end();
    //           }
    //
    //           counter += 1;
    //
    //           // var route = animationData.generateRoute(animationData.origin, animationData.destination);
    //           //
    //           // if (route && route.geometry && route.geometry.coordinates && route.geometry.coordinates[counter]) {
    //           //   feature.geometry.coordinates = route.geometry.coordinates[counter];
    //           //
    //           //   if (feature.geometry.coordinates[0] === animationData.destination[0]) {
    //           //     end();
    //           //   }
    //           //
    //           //   counter = counter + 1;
    //           // }
    //         }
    //       }
    //     }
    //   });
    // }

    $scope.glSources = [
      {
        id: 'circles',
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      }, {
        id: 'circles2',
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [2.15, 41.39]
              },
              properties: {
                radius: 'Feature 1',
                animation: {
                  enabled: false,
                  animationFunction: function (map, sourceId, featureId, feature, animationData, deltaTime, end) {
                    feature.geometry.coordinates = [
                      Math.cos(deltaTime / 250) * 70,
                      Math.sin(deltaTime / 2500) * 20
                    ];

                    feature.properties.radius = Math.cos(deltaTime / 500) * 20 < 5 ? 5 : Math.cos(deltaTime / 500) * 20;

                    // if (timestamp >= 20000) {
                    //   end();
                    // }
                  }
                }
              }
            }, {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: routes[1].origin
              },
              properties: {
                radius: 'Feature 2',
                animation: {
                  enabled: false,
                  animationFunction: function (map, sourceId, featureId, feature, animationData, timestamp, end) {
                    feature.geometry.coordinates = [
                      Math.cos(timestamp / 500) * 70,
                      Math.sin(timestamp / 500) * 20
                    ];

                    //console.log(timestamp);

                    if (timestamp >= 15000) {
                      end();
                    }
                  }
                }
              }
            }
          ]
        }
      }
    ];

    $scope.glLayers = [
      {
        id: 'circles',
        type: 'circle',
        source: 'circles',
        paint: {
          'circle-radius': 15,
          'circle-color': '#FF620D'
        },
        popup: {
          enabled: true,
          onClick: {
            message: '<div class="metar-popup"><p>${radius}</p></div>',
            coordinates: 'center'
          }
        }
      }, {
        id: 'circles2',
        type: 'circle',
        source: 'circles2',
        paint: {
          'circle-radius': 12,
          'circle-color': '#006AFC'
        },
        popup: {
          enabled: true,
          onClick: {
            message: '<div class="metar-popup"><p>${radius}</p></div>',
            coordinates: 'center',
            onClose: function (event, popupClosed) {
              console.log(event, popupClosed);
            }
          }
          // onMouseover: {
          //   message: '<div class="metar-popup"><p>${radius}</p></div>',
          //   onClose: function (event, popupClosed) {
          //     console.log(event, popupClosed);
          //   }
          // }
        }
      }
    ];


















    var tempGlSources = [];
    var tempGlLayers = [];

    for (var iterator = 0; iterator < 10; iterator++) {
      var tempLng = Math.floor(Math.random() * -180) + 180;
      var tempLat = Math.floor(Math.random() * -90) + 90;

      tempGlSources.push({
        id: 'circle' + iterator,
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [tempLng, tempLat]
          }
        },
        /*animation: {
          enabled: true,
          animationData: {
            timeoutMilliseconds: 1000 / 15,
            radius: 20
          },
          animationFunction: function (map, sourceId, animationData, timestamp) {
            var newSourceData = {
              type: 'Point',
              coordinates: [
                Math.cos(timestamp / 1000) * animationData.radius,
                Math.sin(timestamp / 1000) * animationData.radius
              ]
            };

            map.getSource(sourceId).setData(newSourceData);
          }
        }*/
      });

      tempGlLayers.push({
        id: 'circle' + iterator,
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 8,
          'circle-color': '#007cbf',
          'circle-opacity': 1
        }
      });

      /*tempGlLayers.push({
        id: 'circle' + iterator + '_animation',
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 8,
          'circle-radius-transition': { duration: 0 },
          'circle-opacity-transition': { duration: 0 },
          'circle-color': '#007cbf',
        },
        animation: {
          enabled: true,
          animationData: {
            timeoutMilliseconds: 1000 / 25,
            initialOpacity: 1,
            opacity: 1,
            initialRadius: 11,
            radius: 11,
            maxRadius: 22
          },
          animationFunction: function (map, layerId, animationData) {
            animationData.radius += (animationData.maxRadius - animationData.radius) / animationData.speed;
            animationData.opacity -= (0.9 / animationData.speed);

            map.setPaintProperty(layerId, 'circle-radius', animationData.radius);
            map.setPaintProperty(layerId, 'circle-opacity', animationData.opacity);

            if (animationData.opacity <= 0) {
              animationData.radius = animationData.initialRadius;
              animationData.opacity = animationData.initialOpacity;
            }
          }
        }
      });*/

      tempGlLayers.push({
        id: 'circle' + iterator + '_before',
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 11,
          'circle-color': 'white',
          'circle-opacity': 1
        },
        before: 'circle' + iterator
      });
    }
  }]);
})(window.angular, window.mapboxgl, window.turf);
