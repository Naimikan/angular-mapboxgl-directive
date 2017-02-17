angular.module('mapboxgl-directive').factory('mapboxglAnimationUtils', ['$window', '$q', 'mapboxglUtils', function ($window, $q, mapboxglUtils) {
  var _animationFunctionStack = [];
  var _requestedAnimationFrame = false;
  var _sourcesAnimation = [];
  var _animationId = null;

  function _executeFunctionStack (deltaTime) {
    var featuresBySource = {};

    _animationFunctionStack.forEach(function (eachFunction) {
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
  }

  function _updateSourcesData (featuresBySource) {
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
  }

  function addAnimationFunction (sourceId, featureId, animationFunction, animationParameters) {
    if (angular.isDefined(animationFunction) && angular.isFunction(animationFunction)) {
      _animationFunctionStack.push({
        sourceId: sourceId,
        featureId: featureId,
        animationFunction: animationFunction,
        animationParameters: animationParameters
      });
    }
  }

  function updateAnimationFunction (featureId, animationFunction, animationData) {
    if (angular.isDefined(animationFunction) && angular.isFunction(animationFunction)) {
      var indexOf = mapboxglUtils.arrayObjectIndexOf(_animationFunctionStack, featureId, 'featureId');

      if (indexOf !== -1) {
        angular.extend(_animationFunctionStack[indexOf].animationParameters, {
          animationFunction: animationFunction,
          animationData: animationData
        });
      } else {
        throw new Error('Feature ID doesn\'t exist');
      }
    }
  }

  function existAnimationByFeatureId (featureId) {
    return mapboxglUtils.arrayObjectIndexOf(_animationFunctionStack, featureId, 'featureId') !== -1;
  }

  function removeAnimationStack () {
    _animationFunctionStack = [];
  }

  function removeAnimationBySourceId (sourceId) {
    _animationFunctionStack = _animationFunctionStack.filter(function (eachFunction) {
      return eachFunction.sourceId !== sourceId;
    });
  }

  function removeAnimationByFeatureId (featureId) {
    _animationFunctionStack = _animationFunctionStack.filter(function (eachFunction) {
      return eachFunction.featureId !== featureId;
    });
  }

  function initAnimationSystem () {
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

    var deltaTime = 0, lastFrameTimeMs = 0;

    var animationLoop = function (timestamp) {
      deltaTime += timestamp - lastFrameTimeMs;
      lastFrameTimeMs = timestamp;

      // Get all animationFunctions and execute them
      var featuresBySource = _executeFunctionStack(deltaTime);
      // Setdata of all animated sources
      _updateSourcesData(featuresBySource);

      _animationId = window.requestAnimationFrame(animationLoop);
    };

    _animationId = window.requestAnimationFrame(animationLoop);
  }

  function stopAnimationLoop () {
    window.cancelAnimationFrame(_animationId);
  }

  function destroy () {
    stopAnimationLoop();
    removeAnimationStack();
  }

  var mapboxglAnimationUtils = {
    initAnimationSystem: initAnimationSystem,
    addAnimationFunction: addAnimationFunction,
    updateAnimationFunction: updateAnimationFunction,
    existAnimationByFeatureId: existAnimationByFeatureId,
    removeAnimationBySourceId: removeAnimationBySourceId,
    removeAnimationByFeatureId: removeAnimationByFeatureId,
    removeAnimationStack: removeAnimationStack,
    stopAnimationLoop: stopAnimationLoop,
    destroy: destroy
  };

  return mapboxglAnimationUtils;
}]);
