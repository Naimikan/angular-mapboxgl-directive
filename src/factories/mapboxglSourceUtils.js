angular.module('mapboxgl-directive').factory('mapboxglSourceUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  var _sourcesCreated = [];

  function createSourceByObject (map, sourceObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(sourceObject) || sourceObject === null) {
      throw new Error('Source object is undefined');
    }

    if (angular.isUndefined(sourceObject.id) || sourceObject.id === null) {
      throw new Error('Source ID Required');
    }

    if (angular.isUndefined(sourceObject.type) || sourceObject.type === null) {
      throw new Error('Source type Required');
    }

    if (angular.isUndefined(sourceObject.data) || sourceObject.data === null) {
      throw new Error('Source data Required');
    }

    var tempObject = {};

    for (var attribute in sourceObject) {
      if (attribute !== 'id') {
        tempObject[attribute] = sourceObject[attribute];
      }
    }

    map.addSource(sourceObject.id, tempObject);

    _sourcesCreated.push(sourceObject.id);
  }

  function existSourceById (sourceId) {
    var exist = false;

    if (angular.isDefined(sourceId) && sourceId !== null) {
      exist = _sourcesCreated.indexOf(sourceId) !== -1 ? true : false;
    }

    return exist;
  }

  function removeSourceById (map, sourceId) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (existSourceById(sourceId)) {
      map.removeSource(sourceId);

      _sourcesCreated = _sourcesCreated.filter(function (eachSourceCreated) {
        return eachSourceCreated !== sourceId;
      });
    } else {
      throw new Error('Invalid source ID');
    }
  }

  function updateSourceByObject (map, sourceObject) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(sourceObject) || sourceObject === null) {
      throw new Error('Source object is undefined');
    }

    if (angular.isUndefined(sourceObject.id) || sourceObject.id === null) {
      throw new Error('Source ID Required');
    }

    if (angular.isUndefined(sourceObject.data) || sourceObject.data === null) {
      throw new Error('Source data Required');
    }

    var currentSource = map.getSource(sourceObject.id);
    currentSource.setData(sourceObject.data);
  }

  function getCreatedSources () {
    return _sourcesCreated;
  }

  var mapboxglSourceUtils = {
    createSourceByObject: createSourceByObject,
    existSourceById: existSourceById,
    removeSourceById: removeSourceById,
    updateSourceByObject: updateSourceByObject,
    getCreatedSources: getCreatedSources
	};

	return mapboxglSourceUtils;
}]);
