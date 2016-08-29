angular.module('mapboxgl-directive').directive('glCenter', ['mapboxglUtils', function (mapboxglUtils) {
	function mapboxGlCenterDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glCenter', function (center) {
				if (mapboxglUtils.isValidCenter(center)) {
					var newCenter = mapboxglUtils.formatCenter(center);

					map.setCenter(newCenter);
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
