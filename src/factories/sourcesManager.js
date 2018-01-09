angular.module('mapboxgl-directive').factory('SourcesManager', ['Utils', 'mapboxglConstants', '$q', '$rootScope', function (Utils, mapboxglConstants, $q, $rootScope) {
  function SourcesManager (mapInstance, animationManager) {
    this.sourcesCreated = [];
    this.mapInstance = mapInstance;

    if (angular.isDefined(animationManager) && animationManager !== null) {
      this.animationManager = animationManager;
    }
  }

  SourcesManager.prototype.recreateSources = function () {
    var self = this;

    self.sourcesCreated.map(function (eachSource) {
      self.createSourceByObject(eachSource.sourceObject);
    });
  };

  SourcesManager.prototype.checkAndCreateFeatureId = function (sourceData) {
    if (angular.isDefined(sourceData)) {
      if (!Utils.isUrl(sourceData)) {
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
    }
  };

  SourcesManager.prototype.createAnimationFunction = function (sourceId, featureId, feature) {
    var self = this;

    var animationFunction = function (animationParameters) {
      animationParameters.animationFunction(this.mapInstance, animationParameters.sourceId, animationParameters.featureId, animationParameters.feature, animationParameters.animationData, animationParameters.deltaTime, animationParameters.end);

      //animationParameters.animationFunction(animationParameters.map, animationParameters.sourceId, animationParameters.animationData, animationParameters.feature, animationParameters.timestamp, animationParameters.requestAnimationFrame);
    };

    self.animationManager.addAnimationFunction(sourceId, featureId, animationFunction, {
      map: this.mapInstance,
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

  SourcesManager.prototype.createSourceByObject = function (sourceObject) {
    var self = this;

    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
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

    this.mapInstance.addSource(sourceObject.id, tempObject);

    tempObject.id = sourceObject.id;

    self.sourcesCreated.push({
      sourceId: sourceObject.id,
      sourceObject: tempObject
    });

    // Check animations
    var sourceCreated = this.mapInstance.getSource(sourceObject.id);

    if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.features) && angular.isArray(sourceCreated._data.features)) {
      sourceCreated._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          self.createAnimationFunction(sourceObject.id, eachFeature.properties.featureId, eachFeature);
        }
      });
    } else if (angular.isDefined(sourceCreated._data) && angular.isDefined(sourceCreated._data.properties) && angular.isDefined(sourceCreated._data.properties.animation) && angular.isDefined(sourceCreated._data.properties.animation.enabled) && sourceCreated._data.properties.animation.enabled && angular.isDefined(sourceCreated._data.properties.animation.animationFunction) && angular.isFunction(sourceCreated._data.properties.animation.animationFunction)) {
      self.createAnimationFunction(sourceObject.id, sourceCreated._data.properties.featureId, sourceCreated._data);
    }
  };

  SourcesManager.prototype.existSourceById = function (sourceId) {
    var exist = false;

    if (angular.isDefined(sourceId) && sourceId !== null) {
      exist = this.sourcesCreated.filter(function (e) { return e.sourceId === sourceId; }).length > 0 ? true : false;
    }

    return exist;
  };

  SourcesManager.prototype.removeSourceById = function (sourceId) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }
    ]);

    if (this.existSourceById(sourceId)) {
      if (this.mapInstance.getSource(sourceId)) {
        this.mapInstance.removeSource(sourceId);
      }

      this.animationManager.removeAnimationBySourceId(sourceId);

      this.sourcesCreated = this.sourcesCreated.filter(function (eachSourceCreated) {
        return eachSourceCreated.sourceId !== sourceId;
      });
    } else {
      throw new Error('Invalid source ID');
    }
  };

  SourcesManager.prototype.updateSourceByObject = function (sourceObject) {
    var self = this;

    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Source object',
        object: sourceObject,
        attributes: ['id', 'data']
      }
    ]);

    self.checkAndCreateFeatureId(sourceObject.data);

    var currentSource = this.mapInstance.getSource(sourceObject.id);

    Utils.checkObjects([
      {
        name: 'Source ' + sourceObject.id,
        object: currentSource
      }
    ]);

    var flagToUpdateSource = false;

    if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.features) && angular.isArray(currentSource._data.features) && currentSource._data.features.length > 0) {
      currentSource._data.features.map(function (eachFeature, index) {
        if (angular.isDefined(eachFeature.properties) && angular.isDefined(eachFeature.properties.animation) && angular.isDefined(eachFeature.properties.animation.enabled) && eachFeature.properties.animation.enabled && angular.isDefined(eachFeature.properties.animation.animationFunction) && angular.isFunction(eachFeature.properties.animation.animationFunction)) {
          if (self.animationManager.existAnimationByFeatureId(eachFeature.properties.featureId)) {
            self.animationManager.updateAnimationFunction(eachFeature.properties.featureId, eachFeature.properties.animation.animationFunction, eachFeature.properties.animation.animationData);
          } else {
            self.createAnimationFunction(sourceObject.id, eachFeature.properties.featureId, eachFeature);
          }
        } else {
          flagToUpdateSource = true;
        }
      });
    } else if (angular.isDefined(currentSource._data) && angular.isDefined(currentSource._data.properties) && angular.isDefined(currentSource._data.properties.animation) && angular.isDefined(currentSource._data.properties.animation.enabled) && currentSource._data.properties.animation.enabled && angular.isDefined(currentSource._data.properties.animation.animationFunction) && angular.isFunction(currentSource._data.properties.animation.animationFunction)) {
      if (self.animationManager.existAnimationByFeatureId(currentSource._data.properties.featureId)) {
        self.animationManager.updateAnimationFunction(currentSource._data.properties.featureId, currentSource._data.properties.animation.animationFunction, currentSource._data.properties.animation.animationData);
      } else {
        self.createAnimationFunction(sourceObject.id, currentSource._data.properties.featureId, currentSource._data);
      }
    } else {
      flagToUpdateSource = true;
    }

    if (flagToUpdateSource && angular.isDefined(sourceObject.data)) {
      currentSource.setData(sourceObject.data);
    }
  };

  SourcesManager.prototype.getCreatedSources = function () {
    return this.sourcesCreated;
  };

  SourcesManager.prototype.removeAllCreatedSources = function () {
    var self = this;

    self.sourcesCreated.map(function (eachSource) {
      self.removeSourceById(eachSource.sourceId);
    });

    // this.sourcesCreated = [];
  };

  return SourcesManager;
}]);
