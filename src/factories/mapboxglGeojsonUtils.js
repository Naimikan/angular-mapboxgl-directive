angular.module('mapboxgl-directive').factory('mapboxglGeojsonUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  function createGeojsonByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    var checkOptionalLayerAttributes = function (layerObject, layerAttributes) {
      var layerAttributesAvailables = [
        'ref',
        'source-layer',
        'minzoom',
        'maxzoom',
        'interactive',
        'filter',
        'layout',
        'paint'
      ];

      if (angular.isDefined(layerAttributes)) {
        layerAttributesAvailables.map(function (eachAttributeAvailable) {
          if (angular.isDefined(layerAttributes[eachAttributeAvailable]) && layerAttributes[eachAttributeAvailable] !== null) {
            layerObject[eachAttributeAvailable] = layerAttributes[eachAttributeAvailable];
          }
        });
      }
    };

    object.id = object.type + '_' + Date.now();

    var sourceData;

    if (angular.isDefined(object.source) && angular.isDefined(object.source.data)) {
      sourceData = object.source.data;
    } else {
      if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
        throw new Error('Object coordinates are undefined');
      }

      if (object.type === 'line') {
        object.geometryType = 'LineString';
      } else if (object.type === 'polygon') {
        object.geometryType = 'Polygon';
      } else if (object.type === 'circle') {
        object.geometryType = 'Point';
      } else {
        throw new Error('Invalid geojson type');
      }

      sourceData = {
        type: 'Feature',
        properties: object.properties || {},
        geometry: {
          type: object.geometryType,
          coordinates: object.coordinates
        }
      };
    }

    var sourceOptions = {
      type: 'geojson',
      data: sourceData,
      maxzoom: angular.isDefined(object.maxzoom) ? object.maxzoom : mapboxglConstants.source.defaultMaxZoom,
      buffer: angular.isDefined(object.buffer) ? object.buffer : mapboxglConstants.source.defaultBuffer,
      tolerance: angular.isDefined(object.tolerance) ? object.tolerance : mapboxglConstants.source.defaultTolerance,
      cluster: angular.isDefined(object.cluster) ? object.cluster : mapboxglConstants.source.defaultCluster,
      clusterRadius: angular.isDefined(object.clusterRadius) ? object.clusterRadius : mapboxglConstants.source.defaultClusterRadius
    };

    if (angular.isDefined(object.clusterMaxZoom) && angular.isNumber(object.clusterMaxZoom)) {
      sourceOptions.clusterMaxZoom = object.clusterMaxZoom;
    }

    map.addSource(object.id, sourceOptions);

    var before = angular.isDefined(object.layer) && angular.isDefined(object.layer.before) ? object.layer.before : undefined;

    var layerToAdd = {
      id: object.id,
      type: object.type,
      source: object.id,
      metadata: {
        type: 'mapboxgl:geojson',
        popup: object.popup
      }
    };

    checkOptionalLayerAttributes(layerToAdd, object.layer);

    map.addLayer(layerToAdd, before);
  }

  var mapboxglGeojsonUtils = {
		createGeojsonByObject: createGeojsonByObject
	};

	return mapboxglGeojsonUtils;
}]);
