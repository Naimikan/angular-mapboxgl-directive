angular.module('mapboxgl-directive').directive('glGeojson', ['mapboxglGeojsonUtils', function (mapboxglGeojsonUtils) {
  function mapboxGlGeojsonDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var disableGeojsonEvents = function (map) {
      map.off('click');
      map.off('mousemove');
    };

    var enableGeojsonEvents = function (map) {
      map.on('click', function (event) {
        var style = map.getStyle();
        var allLayers = style.layers.filter(function (eachLayer) {
          if (angular.isDefined(eachLayer.metadata) && angular.isDefined(eachLayer.metadata.type)) {
            return eachLayer.metadata.type === 'mapboxgl:geojson' && angular.isDefined(eachLayer.metadata.popup) && angular.isDefined(eachLayer.metadata.popup.enabled) && eachLayer.metadata.popup.enabled;
          }
        }).map(function (eachLayer) {
          return eachLayer.id;
        });

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });

        if (features.length > 0) {
          var feature = features[0];

          var popupOptions = feature.layer.metadata.popup.options;
          var popupMessage = feature.layer.metadata.popup.message;

          var popup = new mapboxgl.Popup(popupOptions)
            .setLngLat(map.unproject(event.point))
            .setHTML(popupMessage)
            .addTo(map);
        }
      });

      map.on('mousemove', function (event) {
        var style = map.getStyle();
        var allLayers = style.layers.filter(function (eachLayer) {
          if (angular.isDefined(eachLayer.metadata) && angular.isDefined(eachLayer.metadata.type)) {
            return eachLayer.metadata.type === 'mapboxgl:geojson';
          }
        }).map(function (eachLayer) {
          return eachLayer.id;
        });

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      });
    };

    var geojsonWatched = function (map, controller, geojson) {
      if (angular.isDefined(geojson)) {
        disableGeojsonEvents(map);

        if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call({})) {
          mapboxglGeojsonUtils.createGeojsonByObject(map, geojson);
          controller.addGeojsonObject(geojson);
        } else if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call([])) {
          geojson.map(function (eachGeojson) {
            mapboxglGeojsonUtils.createGeojsonByObject(map, eachGeojson);
            controller.addGeojsonObject(eachGeojson);
          });
        } else {
          throw new Error('Invalid geojson parameter');
        }

        enableGeojsonEvents(map);
      }
    };

    scope.$on('mapboxglMap:styleChanged', function () {
      if (controller.isGeojsonPersistent()) {
        var allGeojsonObjects = angular.copy(controller.getGeojsonObjects());
        controller.removeGeojsonObjects();

        controller.getMap().then(function (map) {
          geojsonWatched(map, controller, allGeojsonObjects);
        });
      } else {
        controller.removeGeojsonObjects();
      }
    });

    /*
      geojson: <Object | Array<Object>>

      obj: {
        type: line | polygon | circle,
        coordinates: LngLatLike | Object,
        layer: {
          layout: Object,
          paint: Object
        },
        popup: {
          enabled: true | false,
          options: Object,
          message: String
        }
      }
    */

		controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glGeojson', function (geojson) {
        if (map.style.loaded()) {
          geojsonWatched(map, controller, geojson);
        } else {
          map.style.on('load', function () {
            geojsonWatched(map, controller, geojson);
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
