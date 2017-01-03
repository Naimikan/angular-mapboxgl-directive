angular.module('mapboxgl-directive').factory('mapboxglLayerUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  var _layersCreated = [];

  function createLayerByObject (map, layerObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(layerObject) || layerObject === null) {
      throw new Error('Layer object is undefined');
    }

    if (angular.isUndefined(layerObject.id) || layerObject.id === null) {
      throw new Error('Layer ID Required');
    }

    var tempObject = {};

    for (var attribute in layerObject) {
      tempObject[attribute] = layerObject[attribute];
    }

    map.addLayer(tempObject);

    _layersCreated.push(layerObject.id);
  }

  function existLayerById (layerId) {
    var exist = false;

    if (angular.isDefined(layerId) && layerId !== null) {
      exist = _layersCreated.indexOf(layerId) !== -1 ? true : false;
    }

    return exist;
  }

  function removeLayerById (map, layerId) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (existLayerById(layerId)) {
      map.removeLayer(layerId);

      _layersCreated = _layersCreated.filter(function (eachLayerCreated) {
        return eachLayerCreated !== layerId;
      });
    } else {
      throw new Error('Invalid layer ID');
    }
  }

  function updateLayerByObject (map, layerObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(layerObject) || layerObject === null) {
      throw new Error('Layer object is undefined');
    }

    if (angular.isUndefined(layerObject.id) || layerObject.id === null) {
      throw new Error('Layer ID Required');
    }

    // Before layer property
    if (angular.isDefined(layerObject.before) && layerObject.before !== null) {
      map.moveLayer(layerObject.id, layerObject.before);
    }

    // Paint properties
    if (angular.isDefined(layerObject.paint) && layerObject.paint !== null) {
      for (var eachPaintProperty in layerObject.paint) {
        var layerPaintProperty = map.getPaintProperty(layerObject.id, eachPaintProperty);

        if (layerPaintProperty !== layerObject.paint[eachPaintProperty]) {
          map.setPaintProperty(layerObject.id, eachPaintProperty, layerObject.paint[eachPaintProperty]);
        }
      }
    }

    // Layout properties
    if (angular.isDefined(layerObject.layout) && layerObject.layout !== null) {
      for (var eachLayoutProperty in layerObject.layout) {
        var layerLayoutProperty = map.getLayoutProperty(layerObject.id, eachLayoutProperty);

        if (layerLayoutProperty !== layerObject.layout[eachLayoutProperty]) {
          map.setLayoutProperty(layerObject.id, eachLayoutProperty, layerObject.layout[eachLayoutProperty]);
        }
      }
    }
  }

  function getCreatedLayers () {
    return _layersCreated;
  }

  var mapboxglLayerUtils = {
    createLayerByObject: createLayerByObject,
    existLayerById: existLayerById,
    removeLayerById: removeLayerById,
    updateLayerByObject: updateLayerByObject,
    getCreatedLayers: getCreatedLayers
	};

	return mapboxglLayerUtils;
}]);
