angular.module('mapboxgl-directive').factory('mapboxglVideoUtils', ['Utils', 'mapboxglConstants', function (Utils, mapboxglConstants) {
  function createVideoByObject (map, object) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Layer object',
        object: object,
        attributes: ['urls', 'coordinates']
      }
    ]);

    object.id = 'video_' + Date.now();

    map.addSource(object.id, {
      type: 'video',
      urls: object.url,
      coordinates: object.coordinates
    });

    map.addLayer({
      id: object.id,
      source: object.id,
      type: 'raster',
      layout: angular.isDefined(object.layer) && angular.isDefined(object.layer.layout) ? object.layer.layout : {},
      paint: angular.isDefined(object.layer) && angular.isDefined(object.layer.paint) ? object.layer.paint : {}
    });
  }

  var mapboxglVideoUtils = {
    createVideoByObject: createVideoByObject
  };

  return mapboxglVideoUtils;
}]);
