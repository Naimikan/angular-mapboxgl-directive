angular.module('mapboxgl-directive').factory('mapboxglSourceUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
  var _sourcesCreated = [];

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
      if (attribute !== 'id' && attribute !== 'animation') {
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
    mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }
    ]);

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

    var currentSource = map.getSource(sourceObject.id);

    mapboxglUtils.checkObjects([
      {
        name: 'Source ' + sourceObject.id,
        object: currentSource
      }
    ]);

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
