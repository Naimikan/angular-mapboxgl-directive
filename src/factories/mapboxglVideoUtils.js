angular.module('mapboxgl-directive').factory('mapboxglVideoUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  function createVideoByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.urls) || !angular.isArray(object.urls) || object.urls === null) {
      throw new Error('Object urls is undefined');
    }

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
      throw new Error('Object coordinates are undefined');
    }

    object.id = object.type + '_' + Date.now();

    map.addSource(object.id, {
      type: 'video',
      urls: object.url,
      coordinates: object.coordinates
    });
  }

  var mapboxglVideoUtils = {
    createVideoByObject: createVideoByObject
  };

  return mapboxglVideoUtils;
}]);