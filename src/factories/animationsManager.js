angular.module('mapboxgl-directive').factory('AnimationsManager', ['$window', '$q', 'Utils', function ($window, $q, Utils) {
  function AnimationsManager () {
    this.animationFunctionStack = [];
    this.animationId = null;
  }

  AnimationsManager.prototype.executeFunctionStack = function (deltaTime) {
    var featuresBySource = {};

    this.animationFunctionStack.forEach(function (eachFunction) {
      eachFunction.animationParameters.deltaTime = deltaTime;

      eachFunction.animationFunction(eachFunction.animationParameters);

      if (!featuresBySource[eachFunction.animationParameters.sourceId]) {
        featuresBySource[eachFunction.animationParameters.sourceId] = {
          map: eachFunction.animationParameters.map,
          features: []
        };
      }

      featuresBySource[eachFunction.animationParameters.sourceId].features.push(eachFunction.animationParameters.feature);
    });

    return featuresBySource;
  };

  AnimationsManager.prototype.updateSourcesData = function (featuresBySource) {
    for (var iterator in featuresBySource) {
      if (featuresBySource.hasOwnProperty(iterator)) {
        var map = featuresBySource[iterator].map;
        var data = map.getSource(iterator)._data;

        if (data.type === 'FeatureCollection') {
          angular.extend(data.features, featuresBySource[iterator].features);
        } else if (data.type === 'Feature') {
          data = {
            type: 'FeatureCollection',
            features: featuresBySource[iterator].features
          };
        }

        map.getSource(iterator).setData(data);
      }
    }
  };

  AnimationsManager.prototype.addAnimationFunction = function (sourceId, featureId, animationFunction, animationParameters) {
    if (angular.isDefined(animationFunction) && angular.isFunction(animationFunction)) {
      this.animationFunctionStack.push({
        sourceId: sourceId,
        featureId: featureId,
        animationFunction: animationFunction,
        animationParameters: animationParameters
      });
    }
  };

  AnimationsManager.prototype.updateAnimationFunction = function (featureId, animationFunction, animationData) {
    if (angular.isDefined(animationFunction) && angular.isFunction(animationFunction)) {
      var indexOf = Utils.arrayObjectIndexOf(this.animationFunctionStack, featureId, 'featureId');

      if (indexOf !== -1) {
        angular.extend(this.animationFunctionStack[indexOf].animationParameters, {
          animationFunction: animationFunction,
          animationData: animationData
        });
      } else {
        throw new Error('Feature ID doesn\'t exist');
      }
    }
  };

  AnimationsManager.prototype.existAnimationByFeatureId = function (featureId) {
    return Utils.arrayObjectIndexOf(this.animationFunctionStack, featureId, 'featureId') !== -1;
  };

  AnimationsManager.prototype.removeAnimationStack = function () {
    this.animationFunctionStack = [];
  };

  AnimationsManager.prototype.removeAnimationBySourceId = function (sourceId) {
    this.animationFunctionStack = this.animationFunctionStack.filter(function (eachFunction) {
      return eachFunction.sourceId !== sourceId;
    });
  };

  AnimationsManager.prototype.removeAnimationByFeatureId = function (featureId) {
    this.animationFunctionStack = this.animationFunctionStack.filter(function (eachFunction) {
      return eachFunction.featureId !== featureId;
    });
  };

  AnimationsManager.prototype.initAnimationSystem = function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var iterator = 0; iterator < vendors.length && !window.requestAnimationFrame; ++iterator) {
      window.requestAnimationFrame = window[vendors[iterator] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[iterator] + 'CancelAnimationFrame'] || window[vendors[iterator] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currentTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currentTime - lastTime));

        var id = window.setTimeout(function () {
          callback(currentTime + timeToCall);
        }, timeToCall);

        lastTime = currentTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }

    var deltaTime = 0, lastFrameTimeMs = 0, self = this;

    var animationLoop = function (timestamp) {
      deltaTime += timestamp - lastFrameTimeMs;
      lastFrameTimeMs = timestamp;

      // Get all animationFunctions and execute them
      var featuresBySource = self.executeFunctionStack(deltaTime);
      // Setdata of all animated sources
      self.updateSourcesData(featuresBySource);

      self.animationId = window.requestAnimationFrame(animationLoop);
    };

    self.animationId = window.requestAnimationFrame(animationLoop);
  };

  AnimationsManager.prototype.stopAnimationLoop = function () {
    window.cancelAnimationFrame(this.animationId);
  };

  AnimationsManager.prototype.destroy = function () {
    this.stopAnimationLoop();
    this.removeAnimationStack();
  };

  return AnimationsManager;
}]);
