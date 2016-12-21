(function (angular) {
  'use strict';

  angular.module('app.Examples', [])

  .constant('examplesAvailables', [
    {
      name: 'simple_map',
      templateUrl: 'javascripts/states/examples/simple_map/SimpleMapTemplate.html',
      controller: 'SimpleMapController'
    }
  ])

  .config(['$stateProvider', 'examplesAvailables', function ($stateProvider, examplesAvailables) {
    $stateProvider.state('examples', {
      abstract: true,
      url: '/examples',
      template: '<ui-view />',
      controller: 'ExamplesController'
    });

    for (var iterator = 0, len = examplesAvailables.length; iterator < len; iterator++) {
      var eachExample = examplesAvailables[iterator];
      var eachExampleName = eachExample.name;

      $stateProvider.state('examples.' + eachExampleName, {
        url: '/' + eachExampleName,
        views: {
          '': {
            templateUrl: eachExample.templateUrl,
            controller: eachExample.controller
          }
        }
      });
    }
  }]);
})(window.angular);
