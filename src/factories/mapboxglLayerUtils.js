angular.module('mapboxgl-directive').factory('mapboxglLayerUtils', ['mapboxglUtils', 'mapboxglConstants', 'mapboxglPopupUtils', function (mapboxglUtils, mapboxglConstants, mapboxglPopupUtils) {
  var _layersCreated = [];
  var _relationLayersPopups = [];
  var _relationLayersEvents = [];

  /* Layer/Popup relation */
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

  /* Layer/Event relation */
  function removeEventRelationByLayerId (layerId) {
    _relationLayersEvents = _relationLayersEvents.filter(function (each) {
      return each.layerId !== layerId;
    });
  }

  function removeAllEventRelations () {
    _relationLayersEvents = [];
  }

  function getEventRelationByLayerId (layerId) {
    var relationArray = _relationLayersEvents.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].events;
    } else {
      return false;
    }
  }

  function createLayerByObject (map, layerObject) {
    mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Layer object',
        object: layerObject,
        attributes: ['id', 'type']
      }
    ]);

    var defaultMetadata = {
      type: 'mapboxgl:' + layerObject.type,
      popup: angular.isDefined(layerObject.popup) && angular.isDefined(layerObject.popup.enabled) && layerObject.popup.enabled ? layerObject.popup.enabled : false
    };

    var tempObject = {};

    for (var attribute in layerObject) {
      if (attribute !== 'before' && attribute !== 'popup' && attribute !== 'animation' && attribute !== 'events') {
        tempObject[attribute] = layerObject[attribute];
      }
    }

    tempObject.metadata = angular.isDefined(layerObject.metadata) ? layerObject.metadata : {};
    angular.extend(tempObject.metadata, defaultMetadata);

    var before = angular.isDefined(layerObject.before) ? layerObject.before : undefined;

    map.addLayer(tempObject, before);

    _layersCreated.push(layerObject.id);

    // Add popup relation
    _relationLayersPopups.push({
      layerId: layerObject.id,
      popup: layerObject.popup
    });

    // Add events relation
    _relationLayersEvents.push({
      layerId: layerObject.id,
      events: layerObject.events
    });
  }

  function existLayerById (layerId) {
    return angular.isDefined(layerId) && layerId !== null && _layersCreated.indexOf(layerId) !== -1;
  }

  function removeLayerById (map, layerId) {
    mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }
    ]);

    if (existLayerById(layerId)) {
      map.removeLayer(layerId);

      _layersCreated = _layersCreated.filter(function (eachLayerCreated) {
        return eachLayerCreated !== layerId;
      });

      mapboxglPopupUtils.removePopupByLayerId(layerId);
      removePopupRelationByLayerId(layerId);
      removeEventRelationByLayerId(layerId);
    } else {
      throw new Error('Invalid layer ID');
    }
  }

  function updateLayerByObject (map, layerObject) {
    mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Layer object',
        object: layerObject,
        attributes: ['id']
      }
    ]);

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
    map.setLayerZoomRange(layerObject.id, layerObject.minzoom || currentLayer.minzoom, layerObject.maxzoom || currentLayer.maxzoom);

    // Popup property
    if (angular.isDefined(layerObject.popup) && layerObject.popup !== null) {
      mapboxglPopupUtils.removePopupByLayerId(layerObject.id);
      removePopupRelationByLayerId(layerObject.id);

      _relationLayersPopups.push({
        layerId: layerObject.id,
        popup: layerObject.popup
      });
    }

    // Events property
    if (angular.isDefined(layerObject.events) && layerObject.events !== null) {
      removeEventRelationByLayerId(layerObject.id);

      _relationLayersEvents.push({
        layerId: layerObject.id,
        events: layerObject.events
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

  function getCreatedLayers () {
    return _layersCreated;
  }

  function removeAllCreatedLayers () {
    removeAllPopupRelations();
    removeAllEventRelations();

    _layersCreated = [];
  }

  var mapboxglLayerUtils = {
    createLayerByObject: createLayerByObject,
    existLayerById: existLayerById,
    removeLayerById: removeLayerById,
    updateLayerByObject: updateLayerByObject,
    getCreatedLayers: getCreatedLayers,
    removeAllCreatedLayers: removeAllCreatedLayers,
    removeAllPopupRelations: removeAllPopupRelations,
    removePopupRelationByLayerId: removePopupRelationByLayerId,
    getPopupRelationByLayerId: getPopupRelationByLayerId,
    removeAllEventRelations: removeAllEventRelations,
    removeEventRelationByLayerId: removeEventRelationByLayerId,
    getEventRelationByLayerId: getEventRelationByLayerId
	};

	return mapboxglLayerUtils;
}]);
