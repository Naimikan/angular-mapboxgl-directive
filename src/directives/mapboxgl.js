angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'mapboxglUtils', 'mapboxglConstants', function ($q, mapboxglUtils, mapboxglConstants) {
  function mapboxGlDirectiveController ($scope) {
    this._mapboxGlMap = $q.defer();

    this.getMap = function () {
      return this._mapboxGlMap.promise;
    };

    this.getMapboxGlScope = function () {
      return $scope;
    };
  }

  function mapboxGlDirectiveLink (scope, element, attrs, controller) {
    if (!mapboxgl) {
      throw new Error('Mapbox GL does not included');
    }

    if (!mapboxgl.accessToken) {
      throw new Error('Mapbox access token does not defined');
    }

    if (!mapboxgl.supported()) {
      throw new Error('Your browser does not support Mapbox GL');
    }

    scope.mapboxglMapId = attrs.id ? attrs.id : mapboxglUtils.generateMapId();

    element.attr('id', scope.mapboxglMapId);

    var updateWidth = function () {
      if (isNaN(attrs.width)) {
        element.css('width', attrs.width);
      } else {
        element.css('width', attrs.width + 'px');
      }
    };

    var updateHeight = function () {
      if (isNaN(attrs.height)) {
        element.css('height', attrs.height);
      } else {
        element.css('height', attrs.height + 'px');
      }
    };

    if (angular.isDefined(attrs.width)) {
      updateWidth();

      scope.$watch(function () {
        return element[0].getAttribute('width');
      }, function () {
        updateWidth();
      });
    }

    if (angular.isDefined(attrs.height)) {
      updateHeight();

      scope.$watch(function () {
        return element[0].getAttribute('height');
      }, function () {
        updateHeight();
      });
    }

    var mapboxGlMap = new mapboxgl.Map({
      container: scope.mapboxglMapId,
      style: mapboxglConstants.defaultStyle,
      center: mapboxglConstants.defaultCenter,
      interactive: scope.isInteractive || true
    });

    controller._mapboxGlMap.resolve(mapboxGlMap);

    scope.$on('$destroy', function () {
      mapboxGlMap.remove();
    });

    
    /*scope.$watch(function () { return scope.controlsAvailables; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
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
      }
    }); */
  }

  var directive = {
    restrict: 'EA',
    replace: true,
    scope: {
      glStyle: '=',
      glCenter: '=',
      glMinZoom: '=',
      glMaxZoom: '=',
      glZoom: '=',
      glBearing: '=',
      glPitch: '=',
      glControls: '=',
      glFilter: '=',
      glClasses: '=',

      isInteractive: '='
    },
    transclude: true,
    template: '<div class="angular-mapboxgl-map"><div ng-transclude></div></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);
