(function (angular) {
  'use strict';

  var examplesTypes = {
    styles: 'Styles',
    controls: 'Controls'
  };

  angular.module('app.Examples', [])

  .constant('examplesTypes', examplesTypes)

  .constant('examplesAvailables', [
    {
      name: 'simple_map',
      title: 'Display a map',
      type: examplesTypes.styles,
      description: 'Display a simple map using mapboxgl directive',
      templateUrl: 'javascripts/states/examples/simple_map/SimpleMapTemplate.html',
      controller: 'SimpleMapController',
      uiSref: 'examples.simple_map'
    }, {
      name: 'show_navigation_control',
      title: 'Display Navigation control in a map',
      type: examplesTypes.controls,
      description: 'Display Navigation control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_navigation_control/ShowNavigationControlTemplate.html',
      controller: 'ShowNavigationControlController',
      uiSref: 'examples.show_navigation_control'
    }, {
      name: 'show_scale_control',
      title: 'Display Scale control in a map',
      type: examplesTypes.controls,
      description: 'Display Scale control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_scale_control/ShowScaleControlTemplate.html',
      controller: 'ShowScaleControlController',
      uiSref: 'examples.show_scale_control'
    }, {
      name: 'show_attribution_control',
      title: 'Display Attribution control in a map',
      type: examplesTypes.controls,
      description: 'Display Attribution control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_attribution_control/ShowAttributionControlTemplate.html',
      controller: 'ShowAttributionControlController',
      uiSref: 'examples.show_attribution_control'
    }, {
      name: 'show_geolocate_control',
      title: 'Display Geolocate control in a map',
      type: examplesTypes.controls,
      description: 'Display Geolocate control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_geolocate_control/ShowGeolocateControlTemplate.html',
      controller: 'ShowGeolocateControlController',
      uiSref: 'examples.show_geolocate_control'
    }, {
      name: 'show_geocoder_control',
      title: 'Display Geocoder control in a map',
      type: examplesTypes.controls,
      description: 'Display Geocoder control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_geocoder_control/ShowGeocoderControlTemplate.html',
      controller: 'ShowGeocoderControlController',
      uiSref: 'examples.show_geocoder_control'
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

      $stateProvider.state(eachExample.uiSref, {
        url: '/' + eachExampleName,
        views: {
          '': {
            templateUrl: eachExample.templateUrl,
            controller: eachExample.controller
          }
        },
        data: {
          title: eachExample.title,
          description: eachExample.description
        }
      });
    }
  }]);
})(window.angular);
