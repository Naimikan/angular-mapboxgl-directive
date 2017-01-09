angular.module('mapboxgl-directive').directive('glZoom', [function () {
	function mapboxGlZoomDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glZoom', function (zoomObject) {
				if (angular.isDefined(zoomObject)) {
					if (angular.isNumber(zoomObject.value) && (zoomObject.value >= 0 || zoomObject.value <= 20)) {
						map.setZoom(zoomObject.value, zoomObject.eventData);
					} else {
						throw new Error('Invalid zoom');
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
		link: mapboxGlZoomDirectiveLink
	};

	return directive;
}]);
