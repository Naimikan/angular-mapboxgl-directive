angular.module('mapboxgl-directive').factory('mapboxglUtils', [function () {
	/*
		Generate Map ID by Date timestamp

		return: <string>
	*/
	function generateMapId () {
		return 'mapbox-gl-map-' + Date.now();
	}

	/*
		Check if center is valid and format it.

		return: <Array|boolean> If center is valid, return [Lng, Lat] array. If center is invalid, return false.
	*/
	function validateAndFormatCenter (center) {
		// [lng, lat]
		var formattedCenter = null;

		if (angular.isDefined(center)) {
			if (angular.isNumber(center.lat) && angular.isNumber(center.lng) && (center.lng > -180 || center.lng < 180) && (center.lat > -90 || center.lat < 90)) {
				formattedCenter = [center.lng, center.lat];
			} else if (angular.isArray(center) && center.length === 2 && angular.isNumber(center[0]) && angular.isNumber(center[1]) && (center[0] > -180 || center[0] < 180) && (center[1] > -90 || center[1] < 90)) {
				formattedCenter = center;
			} else {
				return false;
			}

			return formattedCenter;
		}

		return false;
	}

	var mapboxglUtils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter
	};

	return mapboxglUtils;
}]);
