angular.module('mapboxgl-directive').directive('glPitch', [function () {
	function mapboxGlPitchDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glPitch', function (pitchObject) {
				if (angular.isDefined(pitchObject)) {
					if (angular.isNumber(pitchObject.value) && (pitchObject.value >= 0 || pitchObject.value <= 60)) {
						map.setPitch(pitchObject.value, pitchObject.eventData);
					} else {
						throw new Error('Invalid pitch');
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
		link: mapboxGlPitchDirectiveLink
	};

	return directive;
}]);
