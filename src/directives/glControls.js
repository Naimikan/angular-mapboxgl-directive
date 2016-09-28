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
					options: {}
        },
        scale: {
          enabled: true | false,
          options: {}
        },
        attribution: {
          enabled: true | false,
          options: {}
        },
        geolocate: {
          enabled: true | false,
          options: {}
        },
				directions: {
					enabled: true | false,
					options: {}
				},
				draw: {
					enabled: true | false,
					options: {}
				}
      }
    */

		var controlsAvailables = [
			{
				name: 'navigation',
				constructor: mapboxgl.Navigation,
				pluginName: 'mapboxgl.Navigation'
			}, {
				name: 'scale',
				constructor: mapboxgl.Scale,
				pluginName: 'mapboxgl.Scale'
			}, {
				name: 'attribution',
				constructor: mapboxgl.Attribution,
				pluginName: 'mapboxgl.Attribution'
			}, {
				name: 'geolocate',
				constructor: mapboxgl.Geolocate,
				pluginName: 'mapboxgl.Geolocate',
				eventsExposedName: 'mapboxglGeolocate',
				eventsAvailables: [
					'geolocate',
					'error'
				]
			}, {
				name: 'directions',
				constructor: mapboxgl.Directions,
				pluginName: 'mapboxgl.Directions',
				eventsExposedName: 'mapboxglDirections',
				eventsAvailables: [
					'clear',
					'loading',
					'profile',
					'origin',
					'destination',
					'route',
					'error'
				]
			}, {
				name: 'draw',
				constructor: mapboxgl.Draw,
				pluginName: 'mapboxgl.Draw',
				eventsExposedName: 'mapboxglDraw',
				listenInMap: true,
				eventsAvailables: [
					'draw.create',
					'draw.delete',
					'draw.update',
					'draw.selectionchange',
					'draw.modechange',
					'draw.render'
				]
			}
		];

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        if (angular.isDefined(controls)) {
					// Remove all created controls
					removeAllControlsCreated();

					controlsAvailables.map(function (eachControlAvailable) {
						if (angular.isDefined(controls[eachControlAvailable.name]) && angular.isDefined(controls[eachControlAvailable.name].enabled) && controls[eachControlAvailable.name].enabled) {
							if (angular.isDefined(eachControlAvailable.constructor) && angular.isFunction(eachControlAvailable.constructor)) {
								var ControlConstructor = eachControlAvailable.constructor.bind.apply(eachControlAvailable.constructor, controls[eachControlAvailable.name].options);
								var control = new ControlConstructor(controls[eachControlAvailable.name].options);

								addNewControlCreated(eachControlAvailable.name, control, false, eachControlAvailable.eventsAvailables);

		            map.addControl(control);

								if (angular.isDefined(eachControlAvailable.eventsAvailables) && angular.isDefined(eachControlAvailable.eventsExposedName)) {
									var listener = eachControlAvailable.listenInMap ? map : control;

									eachControlAvailable.eventsAvailables.map(function (eachControlEvent) {
										listener.on(eachControlEvent, function (event) {
											$rootScope.$broadcast(eachControlAvailable.eventsExposedName + ':' + eachControlEvent, event);
										});
									});
								}
							} else {
								throw new Error(eachControlAvailable.pluginName + ' plugin is not included.');
							}
	          }
					});

					// Custom Controls
					if (angular.isDefined(controls.custom)) {
						if (angular.isArray(controls.custom)) {
							controls.custom.map(function (eachCustomControl) {
	              if (angular.isDefined(eachCustomControl.constructor)) {
	                var CustomControlFn = eachCustomControl.constructor.bind.apply(eachCustomControl.constructor, eachCustomControl.options);
	                var customControl = new CustomControlFn(eachCustomControl.options);

									var customControlEvents = angular.isArray(eachCustomControl.events) ? eachCustomControl.events : [];

									addNewControlCreated(eachCustomControl.name, customControl, true, customControlEvents);

	                map.addControl(customControl);

									customControlEvents.map(function (eachCustomControlEvent) {
										customControl.on(eachCustomControlEvent, function (event) {
											var eventName = 'mapboxgl:' + eachCustomControl.name + ':' + eachCustomControlEvent;

											$rootScope.$broadcast(eventName, event);
										});
									});
	              }
	            });
						} else {
							throw new Error('\'custom\' must be an array');
						}
          }
        }
			});
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
