angular.module('mapboxgl-directive').directive('glControls', ['$rootScope', 'Utils', 'mapboxglControlsAvailables', '$timeout', function ($rootScope, Utils, mapboxglControlsAvailables, $timeout) {
	function mapboxGlControlsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var _controlsCreated = {
      custom: []
    };

		var drawFeaturesAdded = false, drawControlAdded = false;

	  var addNewControlCreated = function (controlName, newControl, isCustomControl, controlEvents, isEventsListenedByMap) {
	    var mapListenEvents = angular.isDefined(isEventsListenedByMap) ? isEventsListenedByMap : false;
	    var events = angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : [];

	    if (isCustomControl) {
	      _controlsCreated.custom.push({
	        name: controlName || 'customControl_' + Utils.generateGUID(),
	        control: newControl,
	        isEventsListenedByMap: mapListenEvents,
	        events: events
	      });
	    } else {
	      _controlsCreated[controlName] = {
	        control: newControl,
	        isEventsListenedByMap: mapListenEvents,
	        events: events
	      };
	    }
	  };

	  var removeEventsFromControl = function (control, events, isEventsListenedByMap, map) {
	    var listener = isEventsListenedByMap ? map : control;

	    events.map(function (eachEvent) {
	      listener.off(eachEvent);
	    });
	  };

	  var removeAllControlsCreated = function (map) {
	    if (angular.isDefined(map) && map !== null) {
	      for (var attribute in _controlsCreated) {
	        if (attribute !== 'custom') {
	          var controlToRemove = _controlsCreated[attribute];

	          removeEventsFromControl(controlToRemove.control, controlToRemove.events, controlToRemove.isEventsListenedByMap, map);

	          map.removeControl(controlToRemove.control);
	        } else {
	          var customControls = _controlsCreated[attribute];

	          for (var iterator = 0, length = customControls.length; iterator < length; iterator++) {
	            var eachCustomControl = customControls[iterator];

	            removeEventsFromControl(eachCustomControl.control, eachCustomControl.events, eachCustomControl.isEventsListenedByMap, map);

	            map.removeControl(eachCustomControl.control);
	          }
	        }
	      }
	    }

	    // Reset controls created
	    _controlsCreated = {
	      custom: []
	    };
	  };

	  var removeControlCreatedByName = function (map, controlName) {
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
	        removeEventsFromControl(found.control, found.events, found.isEventsListenedByMap, map);

	        map.removeControl(found.control);
	        removed = true;
	      } catch (error) {
	        throw new Error('Error removing control \'' + controlName + '\' --> ' + error);
	      }
	    }

	    return removed;
	  };

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        if (angular.isDefined(controls)) {
					// Remove all created controls
					removeAllControlsCreated(map);

					mapboxglControlsAvailables.map(function (eachControlAvailable) {
						if (angular.isDefined(controls[eachControlAvailable.name]) && angular.isDefined(controls[eachControlAvailable.name].enabled) && controls[eachControlAvailable.name].enabled) {
							if (angular.isDefined(eachControlAvailable.constructor) && angular.isFunction(eachControlAvailable.constructor)) {
								var ControlConstructor = eachControlAvailable.constructor.bind.apply(eachControlAvailable.constructor, controls[eachControlAvailable.name].options);
								var control = new ControlConstructor(controls[eachControlAvailable.name].options);

								addNewControlCreated(eachControlAvailable.name, control, false, eachControlAvailable.eventsAvailables, eachControlAvailable.listenInMap);

								if (angular.isDefined(eachControlAvailable.eventsAvailables) && angular.isDefined(eachControlAvailable.eventsExposedName)) {
									var listener = eachControlAvailable.listenInMap ? map : control;

									eachControlAvailable.eventsAvailables.map(function (eachControlEvent) {
										listener.on(eachControlEvent, function (event) {
											var eventName = eachControlAvailable.eventsExposedName + ':' + eachControlEvent;

											$rootScope.$broadcast(eventName, event);
										});
									});
								}

								var position = controls[eachControlAvailable.name].options && controls[eachControlAvailable.name].options.position ? controls[eachControlAvailable.name].options.position : undefined;

								map.addControl(control, position);

								if (eachControlAvailable.name === 'draw' && controls[eachControlAvailable.name].features && Array.isArray(controls[eachControlAvailable.name].features) && controls[eachControlAvailable.name].features.length > 0) {
									var featureIds = [];

									controls[eachControlAvailable.name].features.map(function (eachFeature) {
										var thisFeatureId = control.add(eachFeature);
										featureIds = featureIds.concat(thisFeatureId);
									});

									control.changeMode(control.modes.SIMPLE_SELECT, {
										featureIds: featureIds
									});

									$timeout(function () {
										control.changeMode(control.modes.SIMPLE_SELECT);
									}, 400, true);
								}
							} else {
								console.warn(eachControlAvailable.pluginName + ' plugin is not included.');
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

									addNewControlCreated(eachCustomControl.name, customControl, true, customControlEvents, eachCustomControl.listenInMap);

									var listener = eachCustomControl.listenInMap ? map : customControl;

									customControlEvents.map(function (eachCustomControlEvent) {
										listener.on(eachCustomControlEvent, function (event) {
											var eventName = 'mapboxgl:' + eachCustomControl.name + ':' + eachCustomControlEvent;

											$rootScope.$broadcast(eventName, event);
										});
									});

									var position = eachCustomControl.options && eachCustomControl.options.position ? eachCustomControl.options.position : undefined;

									map.addControl(customControl, position);
	              }
	            });
						} else {
							console.error('\'custom\' must be an array');
						}
          }

					$rootScope.$broadcast('mapboxglMap:controlsRendered', _controlsCreated);
        }
			});
		});

		scope.$on('$destroy', function () {
			removeAllControlsCreated();
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
