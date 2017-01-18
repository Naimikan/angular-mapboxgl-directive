angular.module('mapboxgl-directive').factory('mapboxglLayerUtils', ['mapboxglUtils', 'mapboxglConstants', 'mapboxglPopupUtils', function (mapboxglUtils, mapboxglConstants, mapboxglPopupUtils) {
  var _layersCreated = [];
  var _relationLayersPopups = [];

  function getCreatedLayers () {
    return _layersCreated;
  }

  function removePopupRelationByLayerId (layerId) {
    _relationLayersPopups = _relationLayersPopups.filter(function (each) {
      return each.layerId !== layerId;
    });
  }

  function removeAllPopupRelations () {
    _relationLayersPopups = [];
  }

  function getPopupRelationByLayerId (layerId) {
    var relationArray = _relationLayersPopups.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].popup;
    } else {
      return false;
    }
  }

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

    if (angular.isUndefined(layerObject.type) || layerObject.type === null) {
      throw new Error('Layer type Required');
    }

    var defaultMetadata = {
      type: 'mapboxgl:' + layerObject.type,
      popup: angular.isDefined(layerObject.popup) && angular.isDefined(layerObject.popup.enabled) && layerObject.popup.enabled ? layerObject.popup.enabled : false
    };

    var tempObject = {};

    for (var attribute in layerObject) {
      if (attribute !== 'before' && attribute !== 'popup' && attribute !== 'animation') {
        tempObject[attribute] = layerObject[attribute];
      }
    }

    tempObject.metadata = angular.isDefined(layerObject.metadata) ? layerObject.metadata : {};
    angular.extend(tempObject.metadata, defaultMetadata);

    var before = angular.isDefined(layerObject.before) && angular.isDefined(layerObject.before) ? layerObject.before : undefined;

    map.addLayer(tempObject, before);

    _layersCreated.push(layerObject.id);

    _relationLayersPopups.push({
      layerId: layerObject.id,
      popup: layerObject.popup
    });
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

      mapboxglPopupUtils.removePopupByLayerId(layerId);
      removePopupRelationByLayerId(layerId);
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

    // Filter property
    if (angular.isDefined(layerObject.filter) && layerObject.filter !== null && angular.isArray(layerObject.filter)) {
      map.setFilter(layerObject.id, layerObject.filter);
    }

    // Minzoom and maxzoom properties
    var currentLayer = map.getLayer(layerObject.id);

    if (angular.isDefined(layerObject.minzoom) && layerObject.minzoom !== null) {
      if (angular.isDefined(layerObject.maxzoom) && layerObject.maxzoom !== null) {
        map.setLayerZoomRange(layerObject.id, layerObject.minzoom, layerObject.maxzoom);
      } else {
        map.setLayerZoomRange(layerObject.id, layerObject.minzoom, currentLayer.maxzoom);
      }
    } else {
      if (angular.isDefined(layerObject.maxzoom) && layerObject.maxzoom !== null) {
        map.setLayerZoomRange(layerObject.id, currentLayer.minzoom, layerObject.maxzoom);
      }
    }

    // Popup property
    if (angular.isDefined(layerObject.popup) && layerObject.popup !== null) {
      mapboxglPopupUtils.removePopupByLayerId(layerObject.id);
      removePopupRelationByLayerId(layerObject.id);

      _relationLayersPopups.push({
        layerId: layerObject.id,
        popup: layerObject.popup
      });
    }

    // Paint properties
    if (angular.isDefined(layerObject.paint) && layerObject.paint !== null) {
      for (var eachPaintProperty in layerObject.paint) {
        if (layerObject.paint.hasOwnProperty(eachPaintProperty)) {
          var layerPaintProperty = map.getPaintProperty(layerObject.id, eachPaintProperty);

          if (layerPaintProperty !== layerObject.paint[eachPaintProperty]) {
            map.setPaintProperty(layerObject.id, eachPaintProperty, layerObject.paint[eachPaintProperty]);
          }
        }
      }
    }

    // Layout properties
    if (angular.isDefined(layerObject.layout) && layerObject.layout !== null) {
      for (var eachLayoutProperty in layerObject.layout) {
        if (layerObject.layout.hasOwnProperty(eachLayoutProperty)) {
          var layerLayoutProperty = map.getLayoutProperty(layerObject.id, eachLayoutProperty);

          if (layerLayoutProperty !== layerObject.layout[eachLayoutProperty]) {
            map.setLayoutProperty(layerObject.id, eachLayoutProperty, layerObject.layout[eachLayoutProperty]);
          }
        }
      }
    }
  }

  var mapboxglLayerUtils = {
    createLayerByObject: createLayerByObject,
    existLayerById: existLayerById,
    removeLayerById: removeLayerById,
    updateLayerByObject: updateLayerByObject,
    getCreatedLayers: getCreatedLayers,
    removeAllPopupRelations: removeAllPopupRelations,
    removePopupRelationByLayerId: removePopupRelationByLayerId,
    getPopupRelationByLayerId: getPopupRelationByLayerId
	};

	return mapboxglLayerUtils;
}]);
