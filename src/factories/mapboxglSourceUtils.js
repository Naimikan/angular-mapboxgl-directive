angular.module('mapboxgl-directive').factory('mapboxglSourceUtils', ['mapboxglUtils', 'mapboxglConstants', 'mapboxglAnimationUtils', '$q', function (mapboxglUtils, mapboxglConstants, mapboxglAnimationUtils, $q) {
  var _sourcesCreated = [];

  function _checkAndCreateFeatureId (sourceData) {
    if (angular.isDefined(sourceData)) {
      if (angular.isDefined(sourceData.features) && angular.isArray(sourceData.features)) {
        sourceData.features = sourceData.features.map(function (eachFeature) {
          if (angular.isUndefined(eachFeature.properties)) {
            eachFeature.properties = {};
          }

          if (angular.isUndefined(eachFeature.properties.featureId)) {
            eachFeature.properties.featureId = mapboxglUtils.generateGUID();
          }

          return eachFeature;
        });
      } else {
        if (angular.isUndefined(sourceData.properties)) {
          sourceData.properties = {};
        }

        if (angular.isUndefined(sourceData.properties.featureId)) {
          sourceData.properties.featureId = mapboxglUtils.generateGUID();
        }
      }
    }
  }

  function _createAnimationFunction (map, sourceId, featureId, feature) {
    var animationFunction = function (animationParameters) {
      animationParameters.animationFunction(animationParameters.map, animationParameters.sourceId, animationParameters.featureId, animationParameters.feature, animationParameters.animationData, animationParameters.deltaTime, animationParameters.end);

      //animationParameters.animationFunction(animationParameters.map, animationParameters.sourceId, animationParameters.animationData, animationParameters.feature, animationParameters.timestamp, animationParameters.requestAnimationFrame);
    };

    mapboxglAnimationUtils.addAnimationFunction(sourceId, featureId, animationFunction, {
      map: map,
      sourceId: sourceId,
      featureId: featureId,
      feature: feature,
      animationData: feature.properties.animation.animationData,
      deltaTime: 0,
      animationFunction: feature.properties.animation.animationFunction,
      end: function () {
        mapboxglAnimationUtils.removeAnimationByFeatureId(featureId);
      }
    });
  }

  function createSourceByObject (map, sourceObject) {
    mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Source object',
        object: sourceObject,
        attributes: ['id', 'type', 'data']
      }
    ]);

    var tempObject = {};

    for (var attribute in sourceObject) {
      if (attribute !== 'id') {
        tempObject[attribute] = sourceObject[attribute];
      }
    }

    _checkAndCreateFeatureId(tempObject.data);

    map.addSource(sourceObject.id, tempObject);
    _sourcesCreated.push(sourceObject.id);

    // Check animations
    var sourceCreated = map.getSource(sourceObject.id);

    if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.features) && angular.isArray(sourceCreated._data.features)) {
      sourceCreated._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          _createAnimationFunction(map, sourceObject.id, eachFeature.properties.featureId, eachFeature);
        }
      });
    } else if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.properties) && angular.isDefined(sourceCreated._data.properties.animation) && angular.isDefined(sourceCreated._data.properties.animation.enabled) && sourceCreated._data.properties.animation.enabled && angular.isDefined(sourceCreated._data.properties.animation.animationFunction) && angular.isFunction(sourceCreated._data.properties.animation.animationFunction)) {
      _createAnimationFunction(map, sourceObject.id, sourceCreated._data.properties.featureId, sourceCreated._data);
    }
  }

  function existSourceById (sourceId) {
    var exist = false;

    if (angular.isDefined(sourceId) && sourceId !== null) {
      exist = _sourcesCreated.indexOf(sourceId) !== -1 ? true : false;
    }

    return exist;
  }

  function removeSourceById (map, sourceId) {
    mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }
    ]);

    if (existSourceById(sourceId)) {
      map.removeSource(sourceId);

      mapboxglAnimationUtils.removeAnimationBySourceId(sourceId);

      _sourcesCreated = _sourcesCreated.filter(function (eachSourceCreated) {
        return eachSourceCreated !== sourceId;
      });
    } else {
      throw new Error('Invalid source ID');
    }
  }

  function updateSourceByObject (map, sourceObject) {
    mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Source object',
        object: sourceObject,
        attributes: ['id', 'data']
      }
    ]);

    _checkAndCreateFeatureId(sourceObject.data);

    var currentSource = map.getSource(sourceObject.id);

    mapboxglUtils.checkObjects([
      {
        name: 'Source ' + sourceObject.id,
        object: currentSource
      }
    ]);

    if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.features) && angular.isArray(currentSource._data.features) && currentSource._data.features.length > 0) {
      currentSource._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          if (mapboxglAnimationUtils.existAnimationByFeatureId(eachFeature.properties.featureId)) {
            mapboxglAnimationUtils.updateAnimationFunction(eachFeature.properties.featureId, eachFeature.properties.animation.animationFunction, eachFeature.properties.animation.animationData);
          } else {
            _createAnimationFunction(map, sourceObject.id, eachFeature.properties.featureId, eachFeature);
          }
        }
      });
    } else if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.properties) && angular.isDefined(currentSource._data.properties.animation) && angular.isDefined(currentSource._data.properties.animation.enabled) && currentSource._data.properties.animation.enabled && angular.isDefined(currentSource._data.properties.animation.animationFunction) && angular.isFunction(currentSource._data.properties.animation.animationFunction)) {
      if (mapboxglAnimationUtils.existAnimationByFeatureId(currentSource._data.properties.featureId)) {
        mapboxglAnimationUtils.updateAnimationFunction(currentSource._data.properties.featureId, currentSource._data.properties.animation.animationFunction, currentSource._data.properties.animation.animationData);
      } else {
        _createAnimationFunction(map, sourceObject.id, currentSource._data.properties.featureId, currentSource._data);
      }
    } else {
      currentSource.setData(sourceObject.data);
    }
  }

  function getCreatedSources () {
    return _sourcesCreated;
  }

  function removeAllCreatedSources () {
    _sourcesCreated = [];
  }

  var mapboxglSourceUtils = {
    createSourceByObject: createSourceByObject,
    existSourceById: existSourceById,
    removeSourceById: removeSourceById,
    removeAllCreatedSources: removeAllCreatedSources,
    updateSourceByObject: updateSourceByObject,
    getCreatedSources: getCreatedSources
	};

	return mapboxglSourceUtils;
}]);
