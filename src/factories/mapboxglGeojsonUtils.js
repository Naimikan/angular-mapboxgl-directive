angular.module('mapboxgl-directive').factory('mapboxglGeojsonUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  var _relationLayersPopups = [];

  function _createSourceByObject (map, sourceObject) {
    if (angular.isUndefined(sourceObject.id)) {
      throw new Error('Source ID Required');
    }

    var tempObject = {};

    for (var attribute in sourceObject) {
      if (attribute !== 'id') {
        tempObject[attribute] = sourceObject[attribute];
      }
    }

    map.addSource(sourceObject.id, tempObject);
  }

  function _createLayerByObject (map, layerObject) {
    if (angular.isUndefined(layerObject.id)) {
      throw new Error('Layer ID Required');
    }

    var defaultMetadata = {
      type: 'mapboxgl:geojson',
      popup: angular.isDefined(layerObject.popup) && angular.isDefined(layerObject.popup.enabled) && layerObject.popup.enabled ? layerObject.popup.enabled : false
    };

    var tempObject = {};

    for (var attribute in layerObject) {
      if (attribute !== 'before' && attribute !== 'popup') {
        tempObject[attribute] = layerObject[attribute];
      }
    }

    tempObject.metadata = angular.isDefined(layerObject.metadata) ? layerObject.metadata : {};
    angular.extend(tempObject.metadata, defaultMetadata);

    var before = angular.isDefined(layerObject.before) && angular.isDefined(layerObject.before) ? layerObject.before : undefined;

    _relationLayersPopups.push({
      layerId: layerObject.id,
      popup: layerObject.popup
    });

    map.addLayer(tempObject, before);
  }

  function removeAllRelations () {
    _relationLayersPopups = [];
  }

  function getPopupByLayerId (layerId) {
    var relationArray = _relationLayersPopups.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].popup;
    } else {
      return false;
    }
  }

  function createGeojsonByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.sources) || angular.isUndefined(object.layers)) {
      throw new Error('Object sources and layers must be defined');
    }

    // Create Sources
    if (Object.prototype.toString.call(object.sources) === Object.prototype.toString.call([])) {
      object.sources.map(function (eachSource) {
        _createSourceByObject(map, eachSource);
      });
    } else if (Object.prototype.toString.call(object.sources) === Object.prototype.toString.call({})) {
      _createSourceByObject(map, object.sources);
    } else {
      throw new Error('Invalid sources parameter');
    }

    // Create Layers
    if (Object.prototype.toString.call(object.layers) === Object.prototype.toString.call([])) {
      object.layers.map(function (eachLayer) {
        _createLayerByObject(map, eachLayer);
      });
    } else if (Object.prototype.toString.call(object.layers) === Object.prototype.toString.call({})) {
      _createLayerByObject(map, object.layers);
    } else {
      throw new Error('Invalid layers parameter');
    }

    /*

    var checkOptionalLayerAttributes = function (layerObject, object) {
      var defaultMetadata = {
        type: 'mapboxgl:geojson',
        popup: angular.isDefined(object.popup) && angular.isDefined(object.popup.enabled) && object.popup.enabled ? object.popup.enabled : false
      };

      if (angular.isDefined(object.layer)) {
        for (var attribute in object.layer) {
          layerObject[attribute] = object.layer[attribute];
        }
      }

      layerObject.metadata = angular.isDefined(layerObject.metadata) ? layerObject.metadata : {};

      angular.extend(layerObject.metadata, defaultMetadata);
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
        object.layerType = object.type;
      } else if (object.type === 'polygon') {
        object.geometryType = 'Polygon';
        object.layerType = 'fill';
      } else if (object.type === 'circle') {
        object.geometryType = 'Point';
        object.layerType = object.type;
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
      type: object.layerType,
      source: object.id
    };

    _relationLayersPopups.push({
      layerId: object.id,
      popup: object.popup
    });

    checkOptionalLayerAttributes(layerToAdd, object);

    map.addLayer(layerToAdd, before);*/
  }

  var mapboxglGeojsonUtils = {
		createGeojsonByObject: createGeojsonByObject,
    getPopupByLayerId: getPopupByLayerId,
    removeAllRelations: removeAllRelations
	};

	return mapboxglGeojsonUtils;
}]);
