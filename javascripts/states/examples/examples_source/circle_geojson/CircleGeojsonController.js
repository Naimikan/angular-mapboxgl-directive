(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('CircleGeojsonController', ['$scope', function ($scope) {
    $scope.glSources = [
      {
        id: 'sourceTest',
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [-73.58, 45.53]
              }
            }
          ]
        }
      }
    ];

    $scope.glLayers = [
      {
        id: 'layerTest',
        source: 'sourceTest',
        type: 'circle',
        paint: {
          'circle-radius': 23,
          'circle-color': '#FF1A47',
          'circle-opacity': 0.7,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FF0033'
        }
      }
    ];
  }]);
})(window.angular);
