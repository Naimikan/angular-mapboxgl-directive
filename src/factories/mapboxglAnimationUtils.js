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








  function addSourceToAnimate (map, sourceId, data) {
    var indexOfSource = mapboxglUtils.arrayObjectIndexOf(_sourcesAnimation, sourceId, 'sourceId');

    if (indexOfSource === -1) {
      _sourcesAnimation.push({
        map: map,
        sourceId: sourceId,
        data: data
      });
    } else {
      _sourcesAnimation[indexOfSource].data = data;
    }
  }

  function updateAnimationSources () {
    _sourcesAnimation.map(function (each) {
      each.map.getSource(each.sourceId).setData(each.data);
    });
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
        // angular.extend(_animationFunctionStack[indexOf], {
        //   animationFunction: animationFunction
        // });

        angular.extend(_animationFunctionStack[indexOf].animationParameters, {
          animationFunction: animationFunction,
          animationData: animationData
        });
      } else {
        throw new Error('Feature ID doesn\'t exist');
      }
    }
  }

  function removeAnimationStack () {
    _animationFunctionStack = [];
  }

  function requestAnimationFrameNeeded () {
    _requestedAnimationFrame = true;
  }

  function existAnimationByFeatureId (featureId) {
    return mapboxglUtils.arrayObjectIndexOf(_animationFunctionStack, featureId, 'featureId') !== -1;
  }

  function animateFunctionStack () {
    var animate = function (timestamp) {
      _animationFunctionStack.map(function (eachFunction) {
        // Update timestamp
        eachFunction.animationParameters.timestamp = timestamp;

        eachFunction.animationFunction(eachFunction.animationParameters);
      });

      if (_requestedAnimationFrame) {
        requestAnimationFrame(animate);
      }
    };

    animate(0);
  }

  var mapboxglAnimationUtils = {
    initAnimationSystem: initAnimationSystem,
    addAnimationFunction: addAnimationFunction,
    updateAnimationFunction: updateAnimationFunction,
    removeAnimationBySourceId: removeAnimationBySourceId,
    removeAnimationByFeatureId: removeAnimationByFeatureId,
    removeAnimationStack: removeAnimationStack,
    requestAnimationFrameNeeded: requestAnimationFrameNeeded,
    existAnimationByFeatureId: existAnimationByFeatureId,
    addSourceToAnimate: addSourceToAnimate,
    updateAnimationSources: updateAnimationSources,
    animateFunctionStack: animateFunctionStack,
    stopAnimationLoop: stopAnimationLoop
  };

  return mapboxglAnimationUtils;
}]);
