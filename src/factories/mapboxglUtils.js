angular.module('mapboxgl-directive').factory('mapboxglUtils', ['$window', function ($window) {
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

		if (angular.isDefined(center)) {
			if (angular.isDefined(center.autodiscover) && center.autodiscover) {
				$window.navigation.geolocation.getCurrentPosition(function (position) {
					var coordinates = position.coords;

					return [coordinates.longitude, coordinates.latitude];
				}, function (error) {
					console.warn('ERROR(' + error.code + '): ' + error.message);
				}, {
					enableHighAccuracy: true,
  				timeout: 5000,
  				maximumAge: 0
				});
			} else if (angular.isNumber(center.lat) && angular.isNumber(center.lng) && (center.lng > -180 || center.lng < 180) && (center.lat > -90 || center.lat < 90)) {
				return [center.lng, center.lat];
			} else if (angular.isArray(center) && center.length === 2 && angular.isNumber(center[0]) && angular.isNumber(center[1]) && (center[0] > -180 || center[0] < 180) && (center[1] > -90 || center[1] < 90)) {
				return center;
			} else {
				return false;
			}
		}

		return false;
	}

	var mapboxglUtils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter
	};

	return mapboxglUtils;
}]);
