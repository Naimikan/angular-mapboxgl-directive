(function (angular) {
  'use strict';

  var examplesTypes = {
    styles: 'Styles',
    controls: 'Controls',
    camera: 'Camera',
    layers: 'Layers'
  };

  angular.module('app.Examples', [])

  .constant('examplesTypes', examplesTypes)

  .constant('examplesAvailables', [
    {
      name: 'simple_map',
      title: 'Display a map',
      type: examplesTypes.styles,
      description: 'Display a simple map using mapboxgl directive',
      templateUrl: 'javascripts/states/examples/examples_source/simple_map/SimpleMapTemplate.html',
      controller: 'SimpleMapController',
      uiSref: 'examples.simple_map'
    }, {
      name: 'non_interactive_map',
      title: 'Display a non-interactive map',
      type: examplesTypes.styles,
      description: 'Display a static map using glInteractive directive',
      templateUrl: 'javascripts/states/examples/examples_source/non_interactive_map/NonInteractiveMapTemplate.html',
      controller: 'NonInteractiveMapController',
      uiSref: 'examples.non_interactive_map'
    }, {
      name: 'show_navigation_control',
      title: 'Display Navigation control in a map',
      type: examplesTypes.controls,
      description: 'Display Navigation control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_navigation_control/ShowNavigationControlTemplate.html',
      controller: 'ShowNavigationControlController',
      uiSref: 'examples.show_navigation_control'
    }, {
      name: 'show_scale_control',
      title: 'Display Scale control in a map',
      type: examplesTypes.controls,
      description: 'Display Scale control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_scale_control/ShowScaleControlTemplate.html',
      controller: 'ShowScaleControlController',
      uiSref: 'examples.show_scale_control'
    }, {
      name: 'show_attribution_control',
      title: 'Display Attribution control in a map',
      type: examplesTypes.controls,
      description: 'Display Attribution control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_attribution_control/ShowAttributionControlTemplate.html',
      controller: 'ShowAttributionControlController',
      uiSref: 'examples.show_attribution_control'
    }, {
      name: 'show_geolocate_control',
      title: 'Display Geolocate control in a map',
      type: examplesTypes.controls,
      description: 'Display Geolocate control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_geolocate_control/ShowGeolocateControlTemplate.html',
      controller: 'ShowGeolocateControlController',
      uiSref: 'examples.show_geolocate_control'
    }, {
      name: 'show_geocoder_control',
      title: 'Display Geocoder control in a map',
      type: examplesTypes.controls,
      description: 'Display Geocoder control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_geocoder_control/ShowGeocoderControlTemplate.html',
      controller: 'ShowGeocoderControlController',
      uiSref: 'examples.show_geocoder_control'
    }, {
      name: 'show_directions_control',
      title: 'Display Directions control in a map',
      type: examplesTypes.controls,
      description: 'Display Directions control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_directions_control/ShowDirectionsControlTemplate.html',
      controller: 'ShowDirectionsControlController',
      uiSref: 'examples.show_directions_control'
    }, {
      name: 'show_draw_control',
      title: 'Display Draw control in a map',
      type: examplesTypes.controls,
      description: 'Display Draw control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_draw_control/ShowDrawControlTemplate.html',
      controller: 'ShowDrawControlController',
      uiSref: 'examples.show_draw_control'
    }, {
      name: 'show_custom_control',
      title: 'Display Custom control in a map',
      type: examplesTypes.controls,
      description: 'Display Custom control in a map using glControls directive',
      templateUrl: 'javascripts/states/examples/examples_source/show_custom_control/ShowCustomControlTemplate.html',
      controller: 'ShowCustomControlController',
      uiSref: 'examples.show_custom_control'
    }, {
      name: 'map_style',
      title: 'Display a map with other style',
      type: examplesTypes.styles,
      description: 'Display a map with other style using glStyle directive',
      templateUrl: 'javascripts/states/examples/examples_source/map_style/MapStyleTemplate.html',
      controller: 'MapStyleController',
      uiSref: 'examples.map_style'
    }, {
      name: 'swipe_between_maps',
      title: 'Swipe between maps',
      type: examplesTypes.styles,
      description: 'Swipe between maps using mapboxglCompare directive',
      templateUrl: 'javascripts/states/examples/examples_source/swipe_between_maps/SwipeBetweenMapsTemplate.html',
      controller: 'SwipeBetweenMapsController',
      uiSref: 'examples.swipe_between_maps'
    }, {
      name: 'map_zoom',
      title: 'Set map zoom',
      type: examplesTypes.camera,
      description: 'Set map zoom using glZoom directive',
      templateUrl: 'javascripts/states/examples/examples_source/map_zoom/MapZoomTemplate.html',
      controller: 'MapZoomController',
      uiSref: 'examples.map_zoom'
    }, {
      name: 'map_center',
      title: 'Set map center',
      type: examplesTypes.camera,
      description: 'Set map center using glCenter directive',
      templateUrl: 'javascripts/states/examples/examples_source/map_center/MapCenterTemplate.html',
      controller: 'MapCenterController',
      uiSref: 'examples.map_center'
    }, {
      name: 'map_pitch_bearing',
      title: 'Set map pitch and bearing',
      type: examplesTypes.camera,
      description: 'Set map pitch and bearing using glPitch and glBearing directives',
      templateUrl: 'javascripts/states/examples/examples_source/map_pitch_bearing/MapPitchBearingTemplate.html',
      controller: 'MapPitchBearingController',
      uiSref: 'examples.map_pitch_bearing'
    }, {
      name: 'map_max_min_zoom',
      title: 'Set min and max zoom',
      type: examplesTypes.camera,
      description: 'Set min and max zoom of a map using glMinZoom and glMaxZoom directives',
      templateUrl: 'javascripts/states/examples/examples_source/map_max_min_zoom/MapMinMaxZoomTemplate.html',
      controller: 'MapMinMaxZoomController',
      uiSref: 'examples.map_max_min_zoom'
    }, {
      name: 'add_circle_geojson',
      title: 'Add a GeoJSON circle',
      type: examplesTypes.layers,
      description: 'Add a GeoJSON circle with glSources and glLayers directives',
      templateUrl: 'javascripts/states/examples/examples_source/circle_geojson/CircleGeojsonTemplate.html',
      controller: 'CircleGeojsonController',
      uiSref: 'examples.add_circle_geojson'
    }, {
      name: 'add_line_geojson',
      title: 'Add a GeoJSON line',
      type: examplesTypes.layers,
      description: 'Add a GeoJSON line with glSources and glLayers directives',
      templateUrl: 'javascripts/states/examples/examples_source/line_geojson/LineGeojsonTemplate.html',
      controller: 'LineGeojsonController',
      uiSref: 'examples.add_line_geojson'
    }, {
      name: 'add_polygon_geojson',
      title: 'Add a GeoJSON polygon',
      type: examplesTypes.layers,
      description: 'Add a GeoJSON polygon with glSources and glLayers directives',
      templateUrl: 'javascripts/states/examples/examples_source/polygon_geojson/PolygonGeojsonTemplate.html',
      controller: 'PolygonGeojsonController',
      uiSref: 'examples.add_polygon_geojson'
    }, {
      name: 'add_extrusion_polygon',
      title: 'Extrude a GeoJSON polygon',
      type: examplesTypes.layers,
      description: 'Extrude a GeoJSON polygon with glSources and glLayers directives',
      templateUrl: 'javascripts/states/examples/examples_source/extrude_polygon/ExtrudePolygonTemplate.html',
      controller: 'ExtrudePolygonController',
      uiSref: 'examples.add_extrusion_polygon'
    }, {
      name: 'move_point_route',
      title: 'Move a point along a route',
      type: examplesTypes.layers,
      description: 'Animate a point along the distance of a route with <a href="http://turfjs.org/">Turf</a>',
      templateUrl: 'javascripts/states/examples/examples_source/move_point_route/MovePointRouteTemplate.html',
      controller: 'MovePointRouteController',
      uiSref: 'examples.move_point_route'
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
