angular.module('mapboxgl-directive').factory('mapboxglMapsData', ['Utils', function (Utils) {
  var _mapInstances = [];

  function addMap (mapId, mapInstance) {
    _mapInstances.push({
      id: mapId,
      mapInstance: mapInstance
    });
  }

  function removeMapById (mapId) {
    _mapInstances = _mapInstances.filter(function (eachMap) {
      return eachMap.id !== mapId;
    });

    // var mapIndexOf = Utils.arrayObjectIndexOf(_mapInstances, mapId, 'id');
    //
    // if (mapIndexOf !== -1) {
    //   var mapObject = _mapInstances[mapIndexOf];
    //   mapObject.mapInstance.remove();
    //
    //   _mapInstances.splice(mapIndexOf, 1);
    // }
  }

  function removeAllMaps () {
    _mapInstances.map(function (eachMapObject) {
      eachMapObject.mapInstance.remove();
    });

    _mapInstances = [];
  }

  function getMaps () {
    return _mapInstances;
  }

  function getMapById (mapId) {
    var mapIndexOf = Utils.arrayObjectIndexOf(_mapInstances, mapId, 'id');

    if (mapIndexOf !== -1) {
      return _mapInstances[mapIndexOf].mapInstance;
    } else {
      return null;
    }
  }

  var mapboxglMapsData = {
    addMap: addMap,
    removeMapById: removeMapById,
    removeAllMaps: removeAllMaps,
    getMaps: getMaps,
    getMapById: getMapById
  };

  return mapboxglMapsData;
}]);
