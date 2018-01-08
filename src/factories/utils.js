angular.module('mapboxgl-directive').factory('Utils', ['$window', '$q', function ($window, $q) {
	/*
		Generate Map ID by Date timestamp

		return: <string>
	*/
	function generateMapId () {
		return 'mapbox-gl-map-' + Date.now();
	}

	/*
		Check if center is valid and format it.

		return: <Array|boolean> If center is valid, return [Lng, Lat] array. If center is invalid, return false.
	*/
	function validateAndFormatCenter (center) {
		// [lng, lat]
		var defer = $q.defer();

		if (angular.isDefined(center)) {
			if (angular.isDefined(center.autodiscover) && center.autodiscover) {
				$window.navigator.geolocation.getCurrentPosition(function (position) {
					var coordinates = position.coords;

					defer.resolve([coordinates.longitude, coordinates.latitude]);
				}, function (error) {
					defer.resolve(false);
					// defer.reject(error);
				}, {
					enableHighAccuracy: true,
  				timeout: 5000,
  				maximumAge: 0
				});
			} else if (angular.isNumber(center.lat) && angular.isNumber(center.lng) && (center.lng > -180 || center.lng < 180) && (center.lat > -90 || center.lat < 90)) {
				defer.resolve([center.lng, center.lat]);
			} else if (angular.isArray(center) && center.length === 2 && angular.isNumber(center[0]) && angular.isNumber(center[1]) && (center[0] > -180 || center[0] < 180) && (center[1] > -90 || center[1] < 90)) {
				defer.resolve(center);
			} else {
				defer.resolve(false);
			}
		} else {
			defer.resolve(false);
		}

		return defer.promise;
	}

	function arrayObjectIndexOf (array, searchTerm, property) {
		for (var iterator = 0, length = array.length; iterator < length; iterator++) {
	    if (array[iterator][property] === searchTerm) {
	      return iterator;
	    }
	  }

	  return -1;
	}

	function stringToBoolean (stringValue) {
		var returnValue = false;

		if (angular.isDefined(stringValue) && stringValue !== null) {
			returnValue = (stringValue.toLowerCase() === 'true');
		}

		return returnValue;
	}

	function stringToNumber (stringValue) {
		if (angular.isDefined(stringValue) && stringValue !== null) {
			var convertedNumber = +stringValue;

			if (!isNaN(convertedNumber)) {
				return convertedNumber;
			} else {
				throw new Error('Utils.stringToNumber --> Invalid stringValue');
			}
		}
	}

	function checkObjects (objectsArray) {
		if (angular.isDefined(objectsArray) && angular.isArray(objectsArray)) {
			objectsArray.map(function (eachObject) {
				if (angular.isUndefined(eachObject.object) || eachObject.object === null) {
					throw new Error(eachObject.name + ' is undefined');
				}

				if (angular.isDefined(eachObject.attributes) && angular.isArray(eachObject.attributes)) {
					eachObject.attributes.map(function (eachAttribute) {
						if (angular.isUndefined(eachObject.object[eachAttribute] || eachObject.object[eachAttribute] === null)) {
							throw new Error(eachObject.name + ' ' + eachAttribute + ' is undefined');
						}
					});
				}
			});
		}
	}

	function generateGUID () {
		function generatePiece () {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}

		return generatePiece() + generatePiece() + '-' + generatePiece() + '-' + generatePiece() + '-' + generatePiece() + '-' + generatePiece() + generatePiece() + generatePiece();
	}

	function isUrl (urlString) {
		/*
			http://www.test.com
			or
			/assets/test.json
		*/

		return /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/.test(urlString) || /^[^\/]+\/[^\/].*$|^\/[^\/].*$/.test(urlString);
	}

	var Utils = {
		generateMapId: generateMapId,
		validateAndFormatCenter: validateAndFormatCenter,
		arrayObjectIndexOf: arrayObjectIndexOf,
		stringToBoolean: stringToBoolean,
		stringToNumber: stringToNumber,
		checkObjects: checkObjects,
		generateGUID: generateGUID,
		isUrl: isUrl
	};

	return Utils;
}]);
