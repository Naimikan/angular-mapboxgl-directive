angular.module('mapboxgl-directive').factory('mapboxglPopupUtils', ['mapboxglUtils', 'mapboxglConstants', function (mapboxglUtils, mapboxglConstants) {
	function createPopupByObject (map, object) {
    if (angular.isUndefined(map) || map === null) {
      throw new Error('Map is undefined');
    }

    if (angular.isUndefined(object) || object === null) {
      throw new Error('Object definition is undefined');
    }

    if (angular.isUndefined(object.coordinates) || object.coordinates === null) {
      throw new Error('Object coordinates are undefined');
    }

    if (angular.isUndefined(object.html) || object.html === null) {
      throw new Error('Object html is undefined');
    }

    var popupOptions = object.options || {};

    var popup = new mapboxgl.Popup(popupOptions)
      .setLngLat(object.coordinates)
      .setHTML(object.html)
      .addTo(map);

    return popup;
	}

	var mapboxglPopupUtils = {
		createPopupByObject: createPopupByObject
	};

	return mapboxglPopupUtils;
}]);
