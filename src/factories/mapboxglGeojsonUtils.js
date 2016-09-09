angular.module('mapboxgl-directive').factory('mapboxglGeojsonUtils', ['mapboxglUtils', function (mapboxglUtils) {
  function createGeojsonByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
      throw new Error('Object coordinates are undefined');
    }

    object.id = object.type + '_' + Date.now();

    if (object.type === 'line') {
      object.geometryType = 'LineString';
    } else if (object.type === 'polygon') {
      object.geometryType = 'Polygon';
    } else if (object.type === 'circle') {
      object.geometryType = 'Point';
    } else {
      throw new Error('Invalid geojson type');
    }

    map.addSource(object.id, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: object.properties || {},
        geometry: {
          type: object.geometryType,
          coordinates: object.coordinates
        }
      }
    });

    map.addLayer({
      id: object.id,
      type: object.type,
      source: object.id,
      metadata: {
        type: 'mapboxgl:geojson',
        popup: object.popup
      },
      layout: object.layer.layout || {},
      paint: object.layer.paint || {}
    }, object.layer.before);
  }

  var mapboxglGeojsonUtils = {
		createGeojsonByObject: createGeojsonByObject
	};

	return mapboxglGeojsonUtils;
}]);
