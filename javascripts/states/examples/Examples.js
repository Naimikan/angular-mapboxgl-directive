(function (angular) {
  'use strict';

  angular.module('app.Examples', [])

  .constant('examplesAvailables', [
    {
      name: 'simple_map',
      title: 'Create a simple map',
      templateUrl: 'javascripts/states/examples/simple_map/SimpleMapTemplate.html',
      controller: 'SimpleMapController'
    }
  ])

  .config(['$stateProvider', 'examplesAvailables', function ($stateProvider, examplesAvailables) {
    $stateProvider.state('examples', {
      abstract: true,
      url: '/examples',
      templateUrl: 'javascripts/states/examples/ExamplesTemplate.html',
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
