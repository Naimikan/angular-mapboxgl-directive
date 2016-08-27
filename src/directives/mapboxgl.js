angular.module('mapboxgl-directive', []).directive('mapboxgl', ['mapboxglUtils', function (mapboxglUtils) {
  function mapboxGlDirectiveLink (scope, element, attrs) {
    var mapboxglMapId = attrs.id ? attrs.id : mapboxglUtils.generateMapId();

    element.attr('id', mapboxglMapId);
    element.css('height', '500px');

    if (!mapboxgl) {
      throw new Error('Mapbox GL does not included');
    }

    if (!mapboxgl.accessToken) {
      throw new Error('Mapbox access token does not defined');
    }

    if (!mapboxgl.supported()) {
      throw new Error('Your browser does not support Mapbox GL');
    }

    scope.mapboxGlMap = new mapboxgl.Map({
      container: mapboxglMapId,
      interactive: scope.isInteractive || true
    });

    scope.mapboxGlControls = {};

    /*
      mapbox://styles/mapbox/streets-v9
      mapbox://styles/mapbox/outdoors-v9
      mapbox://styles/mapbox/light-v9
      mapbox://styles/mapbox/dark-v9
      mapbox://styles/mapbox/satellite-v9
      mapbox://styles/mapbox/satellite-streets-v9
    */

    scope.$watch(function () { return scope.mapStyle; }, function (newValue, oldValue) {
      var defaultStyle = 'mapbox://styles/mapbox/streets-v9';

      if (newValue !== void 0) {
        defaultStyle = newValue;
      }

      scope.mapboxGlMap.setStyle(defaultStyle);
    });

    scope.$watch(function () { return scope.mapCenter; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        var newCenter;

        if (newValue.lat !== void 0 && newValue.lng !== void 0) {
          newCenter = [newValue.lat, newValue.lng];
        } else if (angular.isArray(newValue) && newValue.length === 2) {
          newCenter = newValue;
        } else {
          console.warn('Invalid center. Changing to [0, 0]');
          newCenter = [0, 0];
        }

        scope.mapboxGlMap.setCenter(newCenter);
      }
    });

    /*
      controlsAvailables: {
        navigationControl: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        geolocateControl: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        scaleControl: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        drawControl: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        }
      }
    */
    scope.$watch(function () { return scope.controlsAvailables; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        // Navigation Control
        if (newValue.navigationControl !== void 0 && newValue.navigationControl.enabled !== void 0 && newValue.navigationControl.enabled) {
          scope.mapboxGlControls.navigation = new mapboxgl.Navigation({
            position: newValue.navigationControl.position || 'top-right'
          });

          scope.mapboxGlMap.addControl(scope.mapboxGlControls.navigation);
        }

        // Geolocate Control
        if (newValue.geolocateControl !== void 0 && newValue.geolocateControl.enabled !== void 0 && newValue.geolocateControl.enabled) {
          scope.mapboxGlControls.geolocate = new mapboxgl.Geolocate({
            position: newValue.geolocateControl.position || 'bottom-right'
          });

          scope.mapboxGlMap.addControl(scope.mapboxGlControls.geolocate);
        }

        // Custom Control ScaleRule
        if (newValue.scaleControl !== void 0 && newValue.scaleControl.enabled !== void 0 && newValue.scaleControl.enabled) {
          if (mapboxgl.ScaleRule !== void 0) {
            scope.mapboxGlControls.scaleRule = new mapboxgl.ScaleRule({
              position: newValue.scaleControl.position || 'bottom-left'
            });

            scope.mapboxGlMap.addControl(scope.mapboxGlControls.scaleRule);
          } else {
            throw new Error('mapboxgl.ScaleRule plugin is not included.');
          }
        }

        // Custom Control DrawGl
        if (newValue.drawControl !== void 0 && newValue.drawControl.enabled !== void 0 && newValue.drawControl.enabled) {
          if (mapboxgl.DrawGl !== void 0) {
            scope.mapboxGlControls.drawGl = new mapboxgl.DrawGl({
              position: newValue.drawControl.position || 'top-left',
              drawOptions: newValue.drawControl.drawOptions ? {
                polyline: newValue.drawControl.drawOptions.polyline ? newValue.drawControl.drawOptions.polyline : false,
                polygon: newValue.drawControl.drawOptions.polygon ? newValue.drawControl.drawOptions.polygon : false,
                rectangle: newValue.drawControl.drawOptions.rectangle ? newValue.drawControl.drawOptions.rectangle : false,
                circle: newValue.drawControl.drawOptions.circle ? newValue.drawControl.drawOptions.circle : false,
                marker: newValue.drawControl.drawOptions.marker ? newValue.drawControl.drawOptions.marker : false,
                edit: newValue.drawControl.drawOptions.edit ? newValue.drawControl.drawOptions.edit : true,
                trash: newValue.drawControl.drawOptions.trash ? newValue.drawControl.drawOptions.trash : true
              } : {
                polyline: true,
                polygon: true,
                rectangle: true,
                circle: true,
                marker: true,
                edit: true,
                trash: true
              },
              distanceUnit: mapboxgl.DrawGl.DISTANCE_UNITS.meters
            });

            scope.mapboxGlMap.addControl(scope.mapboxGlControls.drawGl);
          } else {
            throw new Error('mapboxgl.DrawGl plugin is not included.');
          }
        }

        // ToDo: Other official plugins and custom controls
      }
    });

    scope.$watch(function () { return scope.mapMinZoom; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        var newMinZoomValue = 0;

        if (angular.isNumber(newValue)) {
          newMinZoomValue = newValue;
        } else {
          console.warn('Invalid Min Zoom. Changing to ' + newMinZoomValue);
        }

        scope.mapboxGlMap.setMinZoom(newMinZoomValue);
      }
    });

    scope.$watch(function () { return scope.mapMaxZoom; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        var newMaxZoomValue = 20;

        if (angular.isNumber(newValue)) {
          newMaxZoomValue = newValue;
        } else {
          console.warn('Invalid Max Zoom. Changing to ' + newMaxZoomValue);
        }

        scope.mapboxGlMap.setMaxZoom(newMaxZoomValue);
      }
    });

    scope.$watch(function () { return scope.mapZoom; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        var newZoomValue = 9;

        if (angular.isNumber(newValue)) {
          newZoomValue = newValue;
        } else {
          console.warn('Invalid Zoom. Changing to ' + newZoomValue);
        }

        scope.mapboxGlMap.setZoom(newZoomValue);
      }
    });

    scope.$watch(function () { return scope.mapBearing; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        var newBearingValue = 0;

        if (angular.isNumber(newValue)) {
          newBearingValue = newValue;
        } else {
          console.warn('Invalid Bearing. Changing to ' + newBearingValue);
        }

        scope.mapboxGlMap.setBearing(newBearingValue);
      }
    });

    scope.$watch(function () { return scope.mapPitch; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        var newPitchValue = 0;

        if (angular.isNumber(newValue)) {
          newPitchValue = newValue;
        } else {
          console.warn('Invalid Pitch. Changing to ' + newPitchValue);
        }

        scope.mapboxGlMap.setPitch(newPitchValue);
      }
    });
  }

  var directive = {
    restrict: 'EA',
    replace: true,
    scope: {
      mapStyle: '=',
      mapCenter: '=',
      mapMinZoom: '=',
      mapMaxZoom: '=',
      mapZoom: '=',
      mapBearing: '=',
      mapPitch: '=',
      isInteractive: '=',
      controlsAvailables: '='
    },
    template: '<div></div>',
    link: mapboxGlDirectiveLink
  };

  return directive;
}]);