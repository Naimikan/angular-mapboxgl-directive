angular.module('mapboxgl-directive').directive('glGeojson', ['mapboxglGeojsonUtils', function (mapboxglGeojsonUtils) {
  function mapboxGlGeojsonDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    /*
      geojson: <Object | Array<Object>>

      obj: {
        type: line | polygon | circle
      }
    */

		controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glGeojson', function (geojson) {
        if (map.loaded()) {
          if (angular.isDefined(geojson)) {
            if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call({})) {
              mapboxglGeojsonUtils.createGeojsonByObject(map, geojson);
            } else if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call([])) {
              geojson.map(function (eachGeojson) {
                mapboxglGeojsonUtils.createGeojsonByObject(map, eachGeojson);
              });
            } else {
              throw new Error('Invalid geojson parameter');
            }
          }
        } else {
          map.on('load', function () {
            if (angular.isDefined(geojson)) {
              if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call({})) {
                mapboxglGeojsonUtils.createGeojsonByObject(map, geojson);
              } else if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call([])) {
                geojson.map(function (eachGeojson) {
                  mapboxglGeojsonUtils.createGeojsonByObject(map, eachGeojson);
                });
              } else {
                throw new Error('Invalid geojson parameter');
              }
            }
          });
        }
      });
    });
  }

  var directive = {
    restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlGeojsonDirectiveLink
  };

  return directive;
}]);
