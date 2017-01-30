angular.module('mapboxgl-directive').directive('glStyle', ['$rootScope', function ($rootScope) {
	function mapboxGlStyleDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		/*
      mapbox://styles/mapbox/streets-v9
      mapbox://styles/mapbox/outdoors-v9
      mapbox://styles/mapbox/light-v9
      mapbox://styles/mapbox/dark-v9
      mapbox://styles/mapbox/satellite-v9
			mapbox://styles/mapbox/satellite-streets-v9
    */

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glStyle', function (style, oldStyle) {
				if (angular.isDefined(style) && style !== null) {
					if (style !== oldStyle) {
						var styleChanged = false;

						map.setStyle(style);

						map.on('styledata', function (event) {
							if (!styleChanged) {
								$rootScope.$broadcast('mapboxglMap:styleChanged', {
									map: map,
									newStyle: style,
									oldStyle: oldStyle
								});

								styleChanged = true;
							}
						});

						/*map.on('style.load', function () {
							$rootScope.$broadcast('mapboxglMap:styleChanged', {
								map: map,
								newStyle: style,
								oldStyle: oldStyle
							});
						});*/
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
		link: mapboxGlStyleDirectiveLink
	};

	return directive;
}]);
