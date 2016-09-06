angular.module('mapboxgl-directive').directive('glControls', [function () {
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

	  var addNewControlCreated = function (controlName, newControl, isCustomControl) {
	    if (isCustomControl) {
	      _controlsCreated.custom.push({
	        name: controlName || 'customControl_' + Date.now(),
	        control: newControl
	      });
	    } else {
	      _controlsCreated[controlName] = newControl;
	    }
	  };

	  var removeAllControlsCreated = function () {
	    for (var attribute in _controlsCreated) {
	      if (attribute !== 'custom') {
	        var controlToRemove = _controlsCreated[attribute];

	        controlToRemove.remove();
	      } else {
	        var customControls = _controlsCreated[attribute];

	        customControls.map(function (eachCustomControl) {
	          eachCustomControl.control.remove();
	        });
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
					found.remove();
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
						var navigationControl = new mapboxgl.Navigation({
              position: controls.navigation.position || 'top-right'
            });

						addNewControlCreated('navigation', navigationControl);

            map.addControl(navigationControl);
          }

          // Scale Control
          if (angular.isDefined(controls.scale) && angular.isDefined(controls.scale.enabled) && controls.scale.enabled) {
						var scaleControl = new mapboxgl.Scale({
              position: controls.scale.position || 'bottom-left'
            });

            addNewControlCreated('scale', scaleControl);

            map.addControl(scaleControl);
          }

          // Attribution Control
          if (angular.isDefined(controls.attribution) && angular.isDefined(controls.attribution.enabled) && controls.attribution.enabled) {
						var attributionControl = new mapboxgl.Attribution({
              position: controls.attribution.position || 'bottom-right'
            });

						addNewControlCreated('attribution', attributionControl);

            map.addControl(attributionControl);
          }

          // Geolocate Control
          if (angular.isDefined(controls.geolocate) && angular.isDefined(controls.geolocate.enabled) && controls.geolocate.enabled) {
						var geolocateControl = new mapboxgl.Geolocate({
              position: controls.geolocate.position || 'top-left'
            });

						addNewControlCreated('geolocate', geolocateControl);

            map.addControl(geolocateControl);
          }

					// Draw Control
					if (angular.isDefined(controls.draw) && angular.isDefined(controls.draw.enabled) && controls.draw.enabled) {
						if (angular.isDefined(mapboxgl.Draw) && angular.isFunction(mapboxgl.Draw)) {
							var drawOptions = {};
							drawOptions.position = controls.draw.position || 'top-right';

							if (angular.isDefined(controls.draw.drawOptions)) {
								angular.extend(drawOptions, controls.draw.drawOptions);
							}

							var drawControl = new mapboxgl.Draw(drawOptions);

							addNewControlCreated('draw', drawControl);

	            map.addControl(drawControl);
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
