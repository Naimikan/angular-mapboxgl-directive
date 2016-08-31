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



        // ToDo
        drawControl: {
          enabled: true | false,
          position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        }
      }
    */
		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glControls', function (controls) {
        if (angular.isDefined(controls)) {
          // Navigation Control
          if (angular.isDefined(controls.navigation) && angular.isDefined(controls.navigation.enabled) && controls.navigation.enabled) {
            mapboxGlControls.navigation = new mapboxgl.Navigation({
              position: controls.navigation.position || 'top-right'
            });

            map.addControl(mapboxGlControls.navigation);
          }

          // Scale Control
          if (angular.isDefined(controls.scale) && angular.isDefined(controls.scale.enabled) && controls.scale.enabled) {
            mapboxGlControls.scale = new mapboxgl.Scale({
              position: controls.scale.position || 'bottom-left'
            });

            map.addControl(mapboxGlControls.scale);
          }

          // Attribution Control
          if (angular.isDefined(controls.attribution) && angular.isDefined(controls.attribution.enabled) && controls.attribution.enabled) {
            mapboxGlControls.attribution = new mapboxgl.Attribution({
              position: controls.attribution.position || 'bottom-right'
            });

            map.addControl(mapboxGlControls.attribution);
          }

          // Geolocate Control
          if (angular.isDefined(controls.geolocate) && angular.isDefined(controls.geolocate.enabled) && controls.geolocate.enabled) {
            mapboxGlControls.geolocate = new mapboxgl.Geolocate({
              position: controls.geolocate.position || 'top-left'
            });

            map.addControl(mapboxGlControls.geolocate);
          }

					// Draw Control
					if (angular.isDefined(controls.draw) && angular.isDefined(controls.draw.enabled) && controls.draw.enabled) {
						if (angular.isDefined(mapboxgl.Draw) && angular.isFunction(mapboxgl.Draw)) {
							var drawOptions = {};
							drawOptions.position = controls.draw.position || 'top-right'

							if (angular.isDefined(controls.draw.drawOptions)) {
								angular.extend(drawOptions, controls.draw.drawOptions);
							}

							mapboxGlControls.draw = new mapboxgl.Draw(drawOptions);

	            map.addControl(mapboxGlControls.draw);
						} else {
							throw new Error('mapboxgl.Draw plugin is not included.');
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
