angular.module('mapboxgl-directive').factory('mapboxglPopupUtils', ['mapboxglUtils', 'mapboxglConstants', '$rootScope', '$compile', function (mapboxglUtils, mapboxglConstants, $rootScope, $compile) {
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

		var popup = new mapboxgl.Popup(popupOptions).setLngLat(map.unproject(object.coordinates));

		// If HTML Element
		if (object.html instanceof HTMLElement) {
			var templateScope = angular.isDefined(object.getScope) && angular.isFunction(object.getScope) ? object.getScope() : $rootScope;
			var templateHtmlElement = $compile(object.html)(templateScope)[0];

			popup.setDOMContent(templateHtmlElement);
		} else {
			popup.setHTML(object.html);
		}

		popup.addTo(map);

    return popup;
	}

	var mapboxglPopupUtils = {
		createPopupByObject: createPopupByObject
	};

	return mapboxglPopupUtils;
}]);
