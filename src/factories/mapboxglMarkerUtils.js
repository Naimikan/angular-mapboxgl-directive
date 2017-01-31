angular.module('mapboxgl-directive').factory('mapboxglMarkerUtils', ['mapboxglUtils', 'mapboxglConstants', 'mapboxglPopupUtils', function (mapboxglUtils, mapboxglConstants, mapboxglPopupUtils) {
	function createMarkerByObject (map, object) {
		mapboxglUtils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Object',
        object: object,
        attributes: ['coordinates', 'element']
      }
    ]);

    var markerOptions = object.options || {};

    var marker = new mapboxgl.Marker(object.element, markerOptions)
      .setLngLat(object.coordinates);

    if (angular.isDefined(object.popup)) {
      var popup = mapboxglPopupUtils.createPopupByObject(map, object.popup);
      marker.setPopup(popup);
    }

    marker.addTo(map);

    return marker;
	}

	var mapboxglMarkerUtils = {
		createMarkerByObject: createMarkerByObject
	};

	return mapboxglMarkerUtils;
}]);
