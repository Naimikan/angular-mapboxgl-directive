angular.module('mapboxgl-directive').directive('glControls', ['$rootScope', function ($rootScope) {
	function mapboxGlControlsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		var _controlsCreated = {
	    custom: []
	  };

		var getControlsCreated = function () {
	    return _controlsCreated;
	  };

	  var setControlsCreated = function (newControlsCreated) {
	    _controlsCreated = newControlsCreated;
	  };

	  var addNewControlCreated = function (controlName, newControl, isCustomControl, controlEvents) {
	    if (isCustomControl) {
	      _controlsCreated.custom.push({
	        name: controlName || 'customControl_' + Date.now(),
	        control: newControl,
					events: angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : []
	      });
	    } else {
	      _controlsCreated[controlName] = {
					control: newControl,
					events: angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : []
				};
	    }
	  };

		var removeEventsFromControl = function (control, events) {
			events.map(function (eachEvent) {
				control.off(eachEvent);
			});
		};

	  var removeAllControlsCreated = function () {
	    for (var attribute in _controlsCreated) {
	      if (attribute !== 'custom') {
	        var controlToRemove = _controlsCreated[attribute];

					removeEventsFromControl(controlToRemove.control, controlToRemove.events);

	        controlToRemove.control.remove();
	      } else {
	        var customControls = _controlsCreated[attribute];

					for (var iterator = 0, length = customControls.length; iterator < length; iterator++) {
						var eachCustomControl = customControls[iterator];

						removeEventsFromControl(eachCustomControl.control, eachCustomControl.events);

	          eachCustomControl.control.remove();
					}
	      }
	    }

	    // Reset controls created
	    _controlsCreated = {
	      custom: []
	    };
	  };

	  var removeControlCreatedByName = function (controlName) {
			var found = false, removed = false;

			for (var attribute in _controlsCreated) {
				if (controlName === attribute) {
					found = _controlsCreated[attribute];
				}
			}

			if (!found) {
				_controlsCreated.custom.map(function (eachCustomControl) {
					if (eachCustomControl.name === controlName) {
						found = eachCustomControl.control;
					}
				});
			}

			if (found) {
				try {
					removeEventsFromControl(found.control, found.events);

					found.control.remove();
					removed = true;
				} catch (error) {
					throw new Error('Error removing control \'' + controlName + '\' --> ' + error);
				}
			}

			return removed;
	  };

    /*
      controls: {
        navigation: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        scale: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        attribution: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
        geolocate: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        },
				directions: {
					enabled: true | false,
					position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
				},
				draw: {
					enabled: true | false,
					position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
				}
      }
    */
		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        if (angular.isDefined(controls)) {
					// Remove all created controls
					removeAllControlsCreated();

          // Navigation Control
          if (angular.isDefined(controls.navigation) && angular.isDefined(controls.navigation.enabled) && controls.navigation.enabled) {
						var navigationControl = new mapboxgl.Navigation(controls.navigation.options);

						addNewControlCreated('navigation', navigationControl);

            map.addControl(navigationControl);
          }

          // Scale Control
          if (angular.isDefined(controls.scale) && angular.isDefined(controls.scale.enabled) && controls.scale.enabled) {
						var scaleControl = new mapboxgl.Scale(controls.scale.options);

            addNewControlCreated('scale', scaleControl);

            map.addControl(scaleControl);
          }

          // Attribution Control
          if (angular.isDefined(controls.attribution) && angular.isDefined(controls.attribution.enabled) && controls.attribution.enabled) {
						var attributionControl = new mapboxgl.Attribution(controls.attribution.options);

						addNewControlCreated('attribution', attributionControl);

            map.addControl(attributionControl);
          }

          // Geolocate Control
          if (angular.isDefined(controls.geolocate) && angular.isDefined(controls.geolocate.enabled) && controls.geolocate.enabled) {
						var geolocateEventsAvailables = [
							'clear',
							'loading',
							'results',
							'result',
							'error'
						];

						var geolocateControl = new mapboxgl.Geolocate(controls.geolocate.options);

						addNewControlCreated('geolocate', geolocateControl, false, geolocateEventsAvailables);

            map.addControl(geolocateControl);

						geolocateEventsAvailables.map(function (eachGeolocateEvent) {
							geolocateControl.on(eachGeolocateEvent, function (event) {
								$rootScope.$broadcast('mapboxglGeolocate:' + eachGeolocateEvent, event);
							});
						});
          }

					// Directions Control
					if (angular.isDefined(controls.directions) && angular.isDefined(controls.directions.enabled) && controls.directions.enabled) {
						var directionsEventsAvailables = [
							'clear',
							'loading',
							'profile',
							'origin',
							'destination',
							'route',
							'error'
						];

						var directionsControl = new mapboxgl.Directions(controls.directions.options);

						addNewControlCreated('directions', directionsControl, false, directionsEventsAvailables);

            map.addControl(directionsControl);

						directionsEventsAvailables.map(function (eachDirectionsEvent) {
							directionsControl.on(eachDirectionsEvent, function (event) {
								$rootScope.$broadcast('mapboxglDirections:' + eachDirectionsEvent, event);
							});
						});
          }

					// Draw Control
					if (angular.isDefined(controls.draw) && angular.isDefined(controls.draw.enabled) && controls.draw.enabled) {
						if (angular.isDefined(mapboxgl.Draw) && angular.isFunction(mapboxgl.Draw)) {
							var drawEventsAvailables = [
								'draw.create',
								'draw.delete',
								'draw.update',
								'draw.selectionchange',
								'draw.modechange',
								'draw.render'
							];

							var drawControl = new mapboxgl.Draw(controls.draw.options);

							addNewControlCreated('draw', drawControl, false, drawEventsAvailables);

	            map.addControl(drawControl);

							drawEventsAvailables.map(function (eachDrawEvent) {
								drawControl.on(eachDrawEvent, function (event) {
									$rootScope.$broadcast('mapboxglDraw:' + eachDrawEvent, event);
								});
							});
						} else {
							throw new Error('mapboxgl.Draw plugin is not included.');
						}
					}

					// Custom Controls
					if (angular.isDefined(controls.custom)) {
						if (angular.isArray(controls.custom)) {
							controls.custom.map(function (eachCustomControl) {
	              if (angular.isDefined(eachCustomControl.constructor)) {
	                var CustomControlFn = eachCustomControl.constructor.bind.apply(eachCustomControl.constructor, eachCustomControl.options);
	                var customControl = new CustomControlFn(eachCustomControl.options);

									addNewControlCreated(eachCustomControl.name, customControl, true);

	                map.addControl(customControl);
	              }
	            });
						} else {
							throw new Error('\'custom\' must be an array');
						}
          }
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
