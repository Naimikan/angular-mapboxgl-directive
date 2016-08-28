angular.module('mapboxgl-directive').directive('glCenter', [function () {
	function mapboxGlCenterDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glCenter', function (center) {
				var newCenter = [0, 0];

				if (center.lat !== void 0 && center.lng !== void 0) {
          newCenter = [center.lat, center.lng];
        } else if (angular.isArray(center) && center.length === 2) {
          newCenter = center;
        }

        map.setCenter(newCenter);
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