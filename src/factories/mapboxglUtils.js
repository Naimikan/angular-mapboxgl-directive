angular.module('mapboxgl-directive').factory('mapboxglUtils', [function () {
	function generateMapId () {
		return 'mapbox-gl-map-' + Date.now();
	}

	var mapboxglUtils = {
		generateMapId: generateMapId
	};

	return mapboxglUtils;
}]);