angular.module('mapboxgl-directive').directive('glLights', [function () {
	function mapboxGlLightsDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glLights', function (lightsObject) {
        if (angular.isDefined(lightsObject)) {
          map.setLight(lightsObject.options, lightsObject.lightOptions);
        }
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlLightsDirectiveLink
	};

	return directive;
}]);
