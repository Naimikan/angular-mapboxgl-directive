angular.module('mapboxgl-directive').factory('mapboxglUtils', [function () {
	function generateMapId () {
		return 'mapbox-gl-map-' + Date.now();
	}

	function isValidCenter (center) {
		var isValid = false;

		if (angular.isDefined(center)) {
			if (angular.isNumber(center.lat) && angular.isNumber(center.lng) && (center.lng > -180 || center.lng < 180) && (center.lat > -90 || center.lat < 90)) {
				isValid = true;
			} else if (angular.isArray(center) && center.length === 2 && angular.isNumber(center[0]) && angular.isNumber(center[1]) && (center[0] > -180 || center[0] < 180) && (center[1] > -90 || center[1] < 90)) {
				// [Lng, Lat]
				isValid = true;
			}
		}

		return isValid;
	}

	function formatCenter (center) {
		// Center format [lng, lat]
		var formattedCenter = null;

		if (isValidCenter(center)) {
			if (angular.isNumber(center.lat) && angular.isNumber(center.lng)) {
				formattedCenter = [center.lng, center.lat];
			} else if (angular.isArray(center)) {
				formattedCenter = center;
			}
		}

		return formattedCenter;
	}

	var mapboxglUtils = {
		generateMapId: generateMapId,
		isValidCenter: isValidCenter,
		formatCenter: formatCenter
	};

	return mapboxglUtils;
}]);
