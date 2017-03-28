angular.module('mapboxgl-directive').factory('SourcesManager', ['Utils', 'mapboxglConstants', '$q', function (Utils, mapboxglConstants, $q) {
  function SourcesManager (animationManager) {
    this.sourcesCreated = [];

    if (angular.isDefined(animationManager) && animationManager !== null) {
      this.animationManager = animationManager;
    }
  }

  SourcesManager.prototype.checkAndCreateFeatureId = function (sourceData) {
    if (angular.isDefined(sourceData)) {
      if (angular.isDefined(sourceData.features) && angular.isArray(sourceData.features)) {
        sourceData.features = sourceData.features.map(function (eachFeature) {
          if (angular.isUndefined(eachFeature.properties)) {
            eachFeature.properties = {};
          }

          if (angular.isUndefined(eachFeature.properties.featureId)) {
            eachFeature.properties.featureId = Utils.generateGUID();
          }

          return eachFeature;
        });
      } else {
        if (angular.isUndefined(sourceData.properties)) {
          sourceData.properties = {};
        }

        if (angular.isUndefined(sourceData.properties.featureId)) {
          sourceData.properties.featureId = Utils.generateGUID();
        }
      }
    }
  };

  SourcesManager.prototype.createAnimationFunction = function (map, sourceId, featureId, feature) {
    var self = this;

    var animationFunction = function (animationParameters) {
      animationParameters.animationFunction(animationParameters.map, animationParameters.sourceId, animationParameters.featureId, animationParameters.feature, animationParameters.animationData, animationParameters.deltaTime, animationParameters.end);

      //animationParameters.animationFunction(animationParameters.map, animationParameters.sourceId, animationParameters.animationData, animationParameters.feature, animationParameters.timestamp, animationParameters.requestAnimationFrame);
    };

    self.animationManager.addAnimationFunction(sourceId, featureId, animationFunction, {
      map: map,
      sourceId: sourceId,
      featureId: featureId,
      feature: feature,
      animationData: feature.properties.animation.animationData,
      deltaTime: 0,
      animationFunction: feature.properties.animation.animationFunction,
      end: function () {
        self.animationManager.removeAnimationByFeatureId(featureId);
      }
    });
  };

  SourcesManager.prototype.createSourceByObject = function (map, sourceObject) {
    var self = this;

    Utils.checkObjects([
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

    self.checkAndCreateFeatureId(tempObject.data);

    map.addSource(sourceObject.id, tempObject);
    self.sourcesCreated.push(sourceObject.id);

    // Check animations
    var sourceCreated = map.getSource(sourceObject.id);

    if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.features) && angular.isArray(sourceCreated._data.features)) {
      sourceCreated._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          self.createAnimationFunction(map, sourceObject.id, eachFeature.properties.featureId, eachFeature);
        }
      });
    } else if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.properties) && angular.isDefined(sourceCreated._data.properties.animation) && angular.isDefined(sourceCreated._data.properties.animation.enabled) && sourceCreated._data.properties.animation.enabled && angular.isDefined(sourceCreated._data.properties.animation.animationFunction) && angular.isFunction(sourceCreated._data.properties.animation.animationFunction)) {
      self.createAnimationFunction(map, sourceObject.id, sourceCreated._data.properties.featureId, sourceCreated._data);
    }
  };

  SourcesManager.prototype.existSourceById = function (sourceId) {
    var exist = false;

    if (angular.isDefined(sourceId) && sourceId !== null) {
      exist = this.sourcesCreated.indexOf(sourceId) !== -1 ? true : false;
    }

    return exist;
  };

  SourcesManager.prototype.removeSourceById = function (map, sourceId) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: map
      }
    ]);

    if (this.existSourceById(sourceId)) {
      map.removeSource(sourceId);

      this.animationManager.removeAnimationBySourceId(sourceId);

      this.sourcesCreated = this.sourcesCreated.filter(function (eachSourceCreated) {
        return eachSourceCreated !== sourceId;
      });
    } else {
      throw new Error('Invalid source ID');
    }
  };

  SourcesManager.prototype.updateSourceByObject = function (map, sourceObject) {
    var self = this;

    Utils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Source object',
        object: sourceObject,
        attributes: ['id', 'data']
      }
    ]);

    self.checkAndCreateFeatureId(sourceObject.data);

    var currentSource = map.getSource(sourceObject.id);

    Utils.checkObjects([
      {
        name: 'Source ' + sourceObject.id,
        object: currentSource
      }
    ]);

    if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.features) && angular.isArray(currentSource._data.features) && currentSource._data.features.length > 0) {
      currentSource._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          if (self.animationManager.existAnimationByFeatureId(eachFeature.properties.featureId)) {
            self.animationManager.updateAnimationFunction(eachFeature.properties.featureId, eachFeature.properties.animation.animationFunction, eachFeature.properties.animation.animationData);
          } else {
            self.createAnimationFunction(map, sourceObject.id, eachFeature.properties.featureId, eachFeature);
          }
        }
      });
    } else if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.properties) && angular.isDefined(currentSource._data.properties.animation) && angular.isDefined(currentSource._data.properties.animation.enabled) && currentSource._data.properties.animation.enabled && angular.isDefined(currentSource._data.properties.animation.animationFunction) && angular.isFunction(currentSource._data.properties.animation.animationFunction)) {
      if (self.animationManager.existAnimationByFeatureId(currentSource._data.properties.featureId)) {
        self.animationManager.updateAnimationFunction(currentSource._data.properties.featureId, currentSource._data.properties.animation.animationFunction, currentSource._data.properties.animation.animationData);
      } else {
        self.createAnimationFunction(map, sourceObject.id, currentSource._data.properties.featureId, currentSource._data);
      }
    } else {
      currentSource.setData(sourceObject.data);
    }
  };

  SourcesManager.prototype.getCreatedSources = function () {
    return this.sourcesCreated;
  };

  SourcesManager.prototype.removeAllCreatedSources = function () {
    this.sourcesCreated = [];
  };

  return SourcesManager;
}]);
