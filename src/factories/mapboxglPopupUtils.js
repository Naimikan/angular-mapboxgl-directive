angular.module('mapboxgl-directive').factory('mapboxglPopupUtils', ['mapboxglUtils', 'mapboxglConstants', '$rootScope', '$compile', function (mapboxglUtils, mapboxglConstants, $rootScope, $compile) {
	var _popupsCreated = [];

	/*
		/\$\{(.+?)\}/g --> Lorem ${ipsum} lorem ${ipsum} --> ['${ipsum}', '${ipsum}']
		/[^\$\{](.+)[^\}]/g --> ${ipsum} --> ipsum
	*/
	var _regexFindDollar = new RegExp(/\$\{(.+?)\}/g);
	var _regexGetValueBetweenDollarClaudator = new RegExp(/[^\$\{](.+)[^\}]/g);

	function getAllPopupsCreated () {
		return _popupsCreated;
	}

	function getPopupByLayerId (layerId) {
		var popupsFiltered = _popupsCreated.filter(function (each) {
			return each.layerId === layerId;
		});

		if (angular.isUndefined(layerId) || layerId === null) {
			return popupsFiltered.map(function (each) {
				return each.popupInstance;
			});
		} else {
			if (popupsFiltered.length > 0) {
				return popupsFiltered[0].popupInstance;
			}
		}
	}

	function removeAllPopupsCreated (map) {
		_popupsCreated.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		_popupsCreated = [];
	}

	function removePopupByLayerId (map, layerId) {
		var popupsByLayer = _popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId === layerId;
		});

		popupsByLayer.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		_popupsCreated = _popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId !== layerId;
		});
	}

	function createPopupByObject (map, feature, object) {
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
			popup.setDOMContent(object.html);
		} else {
			var templateScope = angular.isDefined(object.getScope) && angular.isFunction(object.getScope) ? object.getScope() : $rootScope;
			var htmlCopy = angular.copy(object.html);

			if (_regexFindDollar.test(object.html)) {
				var allMatches = object.html.match(_regexFindDollar);

				if (allMatches.length > 0) {
					allMatches.forEach(function (eachMatch) {
						var tempMatch = eachMatch.match(_regexGetValueBetweenDollarClaudator);

						if (tempMatch.length > 0) {
							var regexValue = tempMatch[0];

							if (feature.properties.hasOwnProperty(regexValue)) {
								htmlCopy = htmlCopy.replace(eachMatch, feature.properties[regexValue]);
							} else {
								throw new Error('Property "' + regexValue + '" isn\'t exist in source "' + feature.layer.source + '"');
							}
						}
					});
				}
			}

			try {
				var templateHtmlElement = $compile(htmlCopy)(templateScope)[0];

				popup.setDOMContent(templateHtmlElement);
			} catch (error) {
				popup.setHTML(htmlCopy);
			}
		}

		popup.addTo(map);

		_popupsCreated.push({
			popupInstance: popup,
			layerId: feature.layer.id
		});

    return popup;
	}

	var mapboxglPopupUtils = {
		createPopupByObject: createPopupByObject,
		getAllPopupsCreated: getAllPopupsCreated,
		getPopupByLayerId: getPopupByLayerId,
		removeAllPopupsCreated: removeAllPopupsCreated,
		removePopupByLayerId: removePopupByLayerId
	};

	return mapboxglPopupUtils;
}]);
