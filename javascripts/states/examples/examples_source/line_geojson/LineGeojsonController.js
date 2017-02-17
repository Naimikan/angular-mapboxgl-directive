(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('LineGeojsonController', ['$scope', function ($scope) {
    $scope.glSources = [
      {
        id: 'routeSource',
        type: 'geojson',
        data: {
           type: 'Feature',
           geometry: {
              type: 'LineString',
              coordinates: [
                 [-99.20003, 19.44236],
                 [-99.20051, 19.441570000000002],
                 [-99.2008, 19.44086],
                 [-99.20108, 19.44033],
                 [-99.203, 19.44005],
                 [-99.20415, 19.44012],
                 [-99.20513, 19.440170000000002],
                 [-99.20795, 19.440360000000002],
                 [-99.20779, 19.441940000000002],
                 [-99.20768, 19.443270000000002],
                 [-99.20764, 19.444360000000003],
                 [-99.20746, 19.445350000000005],
                 [-99.20746, 19.446380000000005]
              ]
           }
        }
     }
    ];

    $scope.glLayers = [
      {
        id: 'routeLayer',
        source: 'routeSource',
        type: 'line',
        paint: {
          'line-width': 5,
          'line-color': '#FF1A47'
        }
      }
    ];
  }]);
})(window.angular);
