(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('MovePointRouteController', ['$scope', function ($scope) {
    $scope.origin = [-122.414, 37.776];
    $scope.destination = [-77.032, 38.913];
    $scope.units = 'kilometers';

    var lineRouteFeature = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [$scope.origin, $scope.destination]
      }
    };

    var lineDistance = turf.lineDistance(lineRouteFeature, $scope.units);
    var lineCoordinates = [];

    for (var iterator = 0; iterator < lineDistance; iterator++) {
      var segment = turf.along(lineRouteFeature, iterator / 1000 * lineDistance, $scope.units);
      lineCoordinates.push(segment.geometry.coordinates);
    }

    lineRouteFeature.geometry.coordinates = lineCoordinates;

    $scope.glSources = [
      {
        id: 'routeSource',
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [lineRouteFeature]
        }
      }, {
        id: 'pointSource',
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: $scope.origin
              },
              properties: {
                animation: {
                  enabled: true,
                  animationData: {
                    origin: $scope.origin,
                    destination: $scope.destination,
                    speed: 5,
                    speedUnit: $scope.units
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

                    feature.geometry.coordinates = segment.geometry.coordinates;

                    if (feature.geometry.coordinates[0] >= animationData.destination[0]) {
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
        id: 'routeLayer',
        source: 'routeSource',
        type: 'line',
        paint: {
          'line-width': 2,
          'line-color': '#FF1A47'
        }
      }, {
        id: 'pointLayer',
        source: 'pointSource',
        type: 'symbol',
        layout: {
          'icon-image': 'airport-15',
          'icon-rotate': 90
        }
      }
    ];
  }]);
})(window.angular);
