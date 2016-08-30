/*!
*  angular-mapboxgl-directive 0.1.0 2016-08-30
*  An AngularJS directive for Mapbox GL
*  git: git+https://github.com/Naimikan/angular-mapboxgl-directive.git
*/
(function (angular, mapboxgl, undefined) {
'use strict';
angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'mapboxglUtils', function ($q, mapboxglUtils) {
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

      scope.$watch(function () { return element[0].getAttribute('width'); }, function () {
        updateWidth();
      });
    }

    if (angular.isDefined(attrs.height)) {
      updateHeight();

      scope.$watch(function () { return element[0].getAttribute('height'); }, function () {
        updateHeight();
      });
    }

    var mapboxGlMap = new mapboxgl.Map({
      container: scope.mapboxglMapId,
      style: 'mapbox://styles/mapbox/streets-v9', // ToDo: Move to default parameters
      center: [0, 0], // ToDo: Move to default parameters
      interactive: scope.isInteractive || true
    });

    controller._mapboxGlMap.resolve(mapboxGlMap);

    scope.$on('$destroy', function () {
      mapboxGlMap.remove();
    });

    






    scope.mapboxGlControls = {};

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

      isInteractive: '=',
      controlsAvailables: '='
    },
    transclude: true,
    template: '<div class="angular-mapboxgl-map"><div ng-transclude></div></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);

angular.module('mapboxgl-directive').factory('mapboxglUtils', [function () {
	/*
		Generate Map ID by Date timestamp

		return: <string>
	*/
	function generateMapId () {
		return 'mapbox-gl-map-' + Date.now();
	}

	/*
		Check if center is valid and format it.

		return: <Array|boolean> If center is valid, return [Lng, Lat] array. If center is invalid, return false.
	*/
	function validateAndFormatCenter (center) {
		// [lng, lat]
		var formattedCenter = null;

		if (angular.isDefined(center)) {
			if (angular.isNumber(center.lat) && angular.isNumber(center.lng) && (center.lng > -180 || center.lng < 180) && (center.lat > -90 || center.lat < 90)) {
				formattedCenter = [center.lng, center.lat];
			} else if (angular.isArray(center) && center.length === 2 && angular.isNumber(center[0]) && angular.isNumber(center[1]) && (center[0] > -180 || center[0] < 180) && (center[1] > -90 || center[1] < 90)) {
				formattedCenter = center;
			} else {
				return false;
			}

			return formattedCenter;
		}

		return false;
	}

	var mapboxglUtils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter
	};

	return mapboxglUtils;
}]);

angular.module('mapboxgl-directive').directive('glBearing', [function () {
	function mapboxGlBearingDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glBearing', function (bearing) {
				if (angular.isNumber(bearing)) {
					map.setBearing(bearing);
				} else {
					throw new Error('Invalid bearing');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlBearingDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glCenter', ['mapboxglUtils', function (mapboxglUtils) {
	function mapboxGlCenterDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glCenter', function (center) {
				center = mapboxglUtils.validateAndFormatCenter(center);

				if (center) {
					map.panTo(center);
				} else {
					throw new Error('Invalid center');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlCenterDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glControls', [function () {
	function mapboxGlControlsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();
    var mapboxGlControls = {};

    /*
      controls: {
        navigation: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        }



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
		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        // Navigation Control
        if (angular.isDefined(controls.navigation) && angular.isDefined(controls.navigation.enabled) && controls.navigation.enabled) {
          mapboxGlControls.navigation = new mapboxgl.Navigation({
            position: controls.navigation.position || 'top-right'
          });

          map.addControl(mapboxGlControls.navigation);
        }
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlControlsDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glMaxBounds', [function () {
	function mapboxGlMaxBoundsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glMaxBounds', function (maxBounds) {
				if (angular.isArray(maxBounds) && maxBounds.length === 2) {
					map.setMaxBounds(maxBounds);
				} else {
					throw new Error('Invalid max bounds');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMaxBoundsDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glMaxZoom', [function () {
	function mapboxGlMaxZoomDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glMaxZoom', function (maxZoom) {
				if (angular.isNumber(maxZoom) && (maxZoom >= 0 || maxZoom <= 20)) {
					map.setMaxZoom(maxZoom);
				} else {
					throw new Error('Invalid max zoom');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMaxZoomDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glMinZoom', [function () {
	function mapboxGlMinZoomDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glMinZoom', function (minZoom) {
				if (angular.isNumber(minZoom) && (minZoom >= 0 || minZoom <= 20)) {
					map.setMinZoom(minZoom);
				} else {
					throw new Error('Invalid min zoom');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMinZoomDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glPitch', [function () {
	function mapboxGlPitchDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glPitch', function (pitch) {
				if (angular.isNumber(pitch) && (pitch >= 0 || pitch <= 60)) {
					map.setPitch(pitch);
				} else {
					throw new Error('Invalid pitch');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlPitchDirectiveLink
	};

	return directive;
}]);
angular.module('mapboxgl-directive').directive('glStyle', [function () {
	function mapboxGlStyleDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		/*
      mapbox://styles/mapbox/streets-v9
      mapbox://styles/mapbox/outdoors-v9
      mapbox://styles/mapbox/light-v9
      mapbox://styles/mapbox/dark-v9
      mapbox://styles/mapbox/satellite-v9
			mapbox://styles/mapbox/satellite-streets-v9
    */

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glStyle', function (style) {
				map.setStyle(style);
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlStyleDirectiveLink
	};

	return directive;
}]);

angular.module('mapboxgl-directive').directive('glZoom', [function () {
	function mapboxGlZoomDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glZoom', function (zoom) {
				if (angular.isNumber(zoom) && (zoom >= 0 || zoom <= 20)) {
					map.setZoom(zoom);
				} else {
					throw new Error('Invalid zoom');
				}
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlZoomDirectiveLink
	};

	return directive;
}]);
}(angular, mapboxgl));