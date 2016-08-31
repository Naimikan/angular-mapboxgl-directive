angular.module('mapboxgl-directive').directive('glCenter', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
	function mapboxGlCenterDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glCenter', function (center) {
				mapboxglUtils.validateAndFormatCenter(center).then(function (newCenter) {
					if (newCenter) {
						map.panTo(newCenter);
					} else {
						throw new Error('Invalid center');
					}
				}).catch(function (error) {
					map.panTo(mapboxglConstants.defaultCenter);

					throw new Error(error.code + ' / ' + error.message);
				});
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
