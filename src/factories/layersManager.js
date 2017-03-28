angular.module('mapboxgl-directive').factory('LayersManager', ['Utils', 'mapboxglConstants', function (Utils, mapboxglConstants) {
  function LayersManager (popupManager) {
    this.layersCreated = [];
    this.relationLayersPopups = [];
    this.relationLayersEvents = [];

    if (angular.isDefined(popupManager) && popupManager !== null) {
      this.popupManager = popupManager;
    }
  }

  LayersManager.prototype.removePopupRelationByLayerId = function (layerId) {
    this.relationLayersPopups = this.relationLayersPopups.filter(function (each) {
      return each.layerId !== layerId;
    });
  };

  LayersManager.prototype.removeAllPopupRelations = function () {
    this.relationLayersPopups = [];
  };

  LayersManager.prototype.getPopupRelationByLayerId = function (layerId) {
    var relationArray = this.relationLayersPopups.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].popup;
    } else {
      return false;
    }
  };

  LayersManager.prototype.removeEventRelationByLayerId = function (layerId) {
    this.relationLayersEvents = this.relationLayersEvents.filter(function (each) {
      return each.layerId !== layerId;
    });
  };

  LayersManager.prototype.removeAllEventRelations = function () {
    this.relationLayersEvents = [];
  };

  LayersManager.prototype.getEventRelationByLayerId = function (layerId) {
    var relationArray = this.relationLayersEvents.filter(function (each) {
      return each.layerId === layerId;
    });

    if (relationArray.length > 0) {
      return relationArray[0].events;
    } else {
      return false;
    }
  };

  LayersManager.prototype.createLayerByObject = function (map, layerObject) {
    Utils.checkObjects([
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

    this.layersCreated.push(layerObject.id);

    // Add popup relation
    this.relationLayersPopups.push({
      layerId: layerObject.id,
      popup: layerObject.popup
    });

    // Add events relation
    this.relationLayersEvents.push({
      layerId: layerObject.id,
      events: layerObject.events
    });
  };

  LayersManager.prototype.existLayerById = function (layerId) {
    return angular.isDefined(layerId) && layerId !== null && this.layersCreated.indexOf(layerId) !== -1;
  };

  LayersManager.prototype.removeLayerById = function (map, layerId) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: map
      }
    ]);

    if (this.existLayerById(layerId)) {
      map.removeLayer(layerId);

      this.layersCreated = this.layersCreated.filter(function (eachLayerCreated) {
        return eachLayerCreated !== layerId;
      });

      this.popupManager.removePopupByLayerId(layerId);
      this.removePopupRelationByLayerId(layerId);
      this.removeEventRelationByLayerId(layerId);
    } else {
      throw new Error('Invalid layer ID');
    }
  };

  LayersManager.prototype.updateLayerByObject = function (map, layerObject) {
    Utils.checkObjects([
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
      this.popupManager.removePopupByLayerId(layerObject.id);
      this.removePopupRelationByLayerId(layerObject.id);

      this.relationLayersPopups.push({
        layerId: layerObject.id,
        popup: layerObject.popup
      });
    }

    // Events property
    if (angular.isDefined(layerObject.events) && layerObject.events !== null) {
      this.removeEventRelationByLayerId(layerObject.id);

      this.relationLayersEvents.push({
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
  };

  LayersManager.prototype.getCreatedLayers = function () {
    return this.layersCreated;
  };

  LayersManager.prototype.removeAllCreatedLayers = function () {
    this.removeAllPopupRelations();
    this.removeAllEventRelations();

    this.layersCreated = [];
  };

  return LayersManager;
}]);
