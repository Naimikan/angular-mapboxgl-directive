(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ClusterPointsController', ['$scope', function ($scope) {
    $scope.glSources = [
      {
        id: 'earthquakes',
        type: 'geojson',
        data: '/assets/earthquakes.geojson',
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      }
    ];

    $scope.glLayers = [
      {
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': {
            property: 'point_count',
            type: 'interval',
            stops: [
              [0, '#51bbd6'],
              [100, '#f1f075'],
              [750, '#f28cb1'],
            ]
          },
          'circle-radius': {
            property: 'point_count',
            type: 'interval',
            stops: [
              [0, 20],
              [100, 30],
              [750, 40]
            ]
          }
        }
      }, {
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 12
        }
      }, {
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!has', 'point_count'],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff'
        }
      }
    ];
  }]);
})(window.angular);
