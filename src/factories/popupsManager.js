angular.module('mapboxgl-directive').factory('PopupsManager', ['Utils', 'mapboxglConstants', '$rootScope', '$compile', function (Utils, mapboxglConstants, $rootScope, $compile) {
  /*
		/\$\{(.+?)\}/g --> Lorem ${ipsum} lorem ${ipsum} --> ['${ipsum}', '${ipsum}']
		/[^\$\{](.+)[^\}]/g --> ${ipsum} --> ipsum
	*/
	var _regexFindDollar = new RegExp(/\$\{(.+?)\}/g);
	var _regexGetValueBetweenDollarClaudator = new RegExp(/[^\$\{](.+)[^\}]/g);

  function PopupsManager (mapInstance) {
    this.popupsCreated = [];
    this.mapInstance = mapInstance;
  }

  PopupsManager.prototype.getAllPopupsCreated = function () {
    return this.popupsCreated;
  };

  PopupsManager.prototype.getPopupByLayerId = function (layerId) {
    if (angular.isDefined(layerId) && layerId !== null) {
			var popupsFiltered = this.popupsCreated.filter(function (each) {
				return each.layerId === layerId;
			});

			if (popupsFiltered.length > 0) {
				return popupsFiltered[0].popupInstance;
			} else {
				return false;
			}
		} else {
			if (this.popupsCreated.length > 0) {
				return this.popupsCreated.map(function (each) {
					return each.popupInstance;
				});
			} else {
				return false;
			}
		}
  };

  PopupsManager.prototype.removeAllPopupsCreated = function () {
    this.popupsCreated.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		this.popupsCreated = [];
  };

  PopupsManager.prototype.removePopupByLayerId = function (layerId) {
    var popupsByLayer = this.popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId === layerId;
		});

		popupsByLayer.map(function (eachPopup) {
			eachPopup.popupInstance.remove();
		});

		this.popupsCreated = this.popupsCreated.filter(function (eachPopup) {
			return eachPopup.layerId !== layerId;
		});
  };

  PopupsManager.prototype.generatePopupMessage = function (object, feature) {
    var popupMessage = angular.copy(object.message);

    if (popupMessage instanceof HTMLElement) {
      return popupMessage;
    } else if (angular.isDefined(feature) && feature !== null) {
      if (_regexFindDollar.test(object.message)) {
				var allMatches = object.message.match(_regexFindDollar);

				if (allMatches.length > 0) {
					allMatches.forEach(function (eachMatch) {
						var tempMatch = eachMatch.match(_regexGetValueBetweenDollarClaudator);

						if (tempMatch.length > 0) {
							var regexValue = tempMatch[0];

							if (feature.properties.hasOwnProperty(regexValue)) {
								popupMessage = popupMessage.replace(eachMatch, feature.properties[regexValue]);
							} else {
								throw new Error('Property "' + regexValue + '" isn\'t exist in source "' + feature.layer.source + '"');
							}
						}
					});
				}
			}
    }

    var templateScope = angular.isDefined(object.getScope) && angular.isFunction(object.getScope) ? object.getScope() : $rootScope;

    try {
      var templateHtmlElement = $compile(popupMessage)(templateScope)[0];

      return templateHtmlElement;
    } catch (error) {
      return popupMessage;
    }
  };

  PopupsManager.prototype.createPopupByObject = function (object, feature) {
    var self = this;

    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Object',
        object: object,
        attributes: ['message']
      }
    ]);

    var popup = new mapboxgl.Popup(object.options || {});

    if (angular.isDefined(object.coordinates) && object.coordinates !== null) {
      var popupCoordinates = object.coordinates;

      if (angular.isDefined(feature) && feature !== null) {
        popupCoordinates = popupCoordinates === 'center' ? feature.geometry.coordinates : popupCoordinates;
      }

      if (popupCoordinates !== 'center') {
        popup.setLngLat(popupCoordinates);
      }
    }

		if (angular.isDefined(object.onClose) && object.onClose !== null && angular.isFunction(object.onClose)) {
			popup.on('close', function (event) {
				object.onClose(event, event.target);
			});
		}

    var popupMessage = self.generatePopupMessage(object, feature);

    if (popupMessage instanceof HTMLElement) {
      popup.setDOMContent(popupMessage);
    } else {
      popup.setHTML(popupMessage);
    }

    var popupCreated = {
      popupInstance: popup,
			isOnClick: object.isOnClick ? object.isOnClick : false,
			isOnMouseover: object.isOnMouseover ? object.isOnMouseover : false
    };

    if (angular.isDefined(feature) && feature !== null) {
      popupCreated.layerId = feature.layer.id;
    }

		self.popupsCreated.push(popupCreated);

    return popup;
  };

  return PopupsManager;
}]);
