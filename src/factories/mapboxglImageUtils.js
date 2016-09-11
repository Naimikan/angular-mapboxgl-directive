angular.module('mapboxgl-directive').factory('mapboxglImageUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
	function createImageByObject (map, object) {
		if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.url) || object.url === null) {
			throw new Error('Object url is undefined');
		}

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
			throw new Error('Object coordinates are undefined');
		}

    object.id = object.type + '_' + Date.now();

    map.addSource(object.id, {
    	type: 'image',
    	url: object.url,
    	coordinates: object.coordinates
    });
	}

	var mapboxglImageUtils = {
		createImageByObject: createImageByObject
	};

	return mapboxglImageUtils;
}]);