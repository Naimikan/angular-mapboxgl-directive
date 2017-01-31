angular.module('mapboxgl-directive').factory('mapboxglImageUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
	function createImageByObject (map, object) {
		mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Layer object',
        object: object,
        attributes: ['url', 'coordinates']
      }
    ]);

    object.id = 'image_' + Date.now();

    map.addSource(object.id, {
    	type: 'image',
    	url: object.url,
    	coordinates: object.coordinates
    });

		map.addLayer({
			id: object.id,
			source: object.id,
			type: 'raster',
			layout: angular.isDefined(object.layer) && angular.isDefined(object.layer.layout) ? object.layer.layout : {},
      paint: angular.isDefined(object.layer) && angular.isDefined(object.layer.paint) ? object.layer.paint : {}
		});
	}

	var mapboxglImageUtils = {
		createImageByObject: createImageByObject
	};

	return mapboxglImageUtils;
}]);
