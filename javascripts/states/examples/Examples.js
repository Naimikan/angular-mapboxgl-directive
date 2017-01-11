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
    }, {
      name: 'show_directions_control',
      title: 'Display Directions control in a map',
      type: examplesTypes.controls,
      description: 'Display Directions control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_directions_control/ShowDirectionsControlTemplate.html',
      controller: 'ShowDirectionsControlController',
      uiSref: 'examples.show_directions_control'
    }, {
      name: 'show_draw_control',
      title: 'Display Draw control in a map',
      type: examplesTypes.controls,
      description: 'Display Draw control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_draw_control/ShowDrawControlTemplate.html',
      controller: 'ShowDrawControlController',
      uiSref: 'examples.show_draw_control'
    }, {
      name: 'show_custom_control',
      title: 'Display Custom control in a map',
      type: examplesTypes.controls,
      description: 'Display Custom control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/show_custom_control/ShowCustomControlTemplate.html',
      controller: 'ShowCustomControlController',
      uiSref: 'examples.show_custom_control'
    }, {
      name: 'swipe_between_maps',
      title: 'Swipe between maps',
      type: examplesTypes.styles,
      description: 'Swipe between maps using mapboxglCompare directive',
      templateUrl: 'javascripts/states/examples/swipe_between_maps/SwipeBetweenMapsTemplate.html',
      controller: 'SwipeBetweenMapsController',
      uiSref: 'examples.swipe_between_maps'
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
