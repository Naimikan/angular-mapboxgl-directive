angular.module('mapboxgl-directive').directive('glGeojson', ['mapboxglGeojsonUtils', 'mapboxglPopupUtils', '$timeout', function (mapboxglGeojsonUtils, mapboxglPopupUtils, $timeout) {
  function mapboxGlGeojsonDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    console.warn('glGeojson will be deprecated in next versions');

    var disableGeojsonEvents = function (map) {
      map.off('click');
      map.off('mousemove');
    };

    var enableGeojsonEvents = function (map) {
      map.on('click', function (event) {
        var style = map.getStyle();
        var allLayers = style.layers.filter(function (eachLayer) {
          if (angular.isDefined(eachLayer.metadata) && angular.isDefined(eachLayer.metadata.type)) {
            return eachLayer.metadata.type === 'mapboxgl:geojson' && angular.isDefined(eachLayer.metadata.popup) && eachLayer.metadata.popup;
          }
        }).map(function (eachLayer) {
          return eachLayer.id;
        });

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });

        if (features.length > 0) {
          var feature = features[0];

          var popupObject = mapboxglGeojsonUtils.getPopupByLayerId(feature.layer.id);

          mapboxglPopupUtils.createPopupByObject(map, {
            coordinates: event.point,
            options: popupObject.options,
            html: popupObject.message,
            getScope: popupObject.getScope
          });
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
        mapboxglGeojsonUtils.removeAllRelations();

        if (Object.prototype.toString.call(geojson) === Object.prototype.toString.call({})) {
          mapboxglGeojsonUtils.createGeojsonByObject(map, geojson);
          controller.addGeojsonObject(geojson);
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
      geojson: <Object>

      obj: {
        sources: [
          {
            id: String,
            data: URL String | GeoJSON,
            maxzoom: Number,
            buffer: Number,
            tolerance: Number,
            cluster: boolean,
            clusterRadius: Number,
            clusterMaxZoom: Number
          }
        ],
        layers: [
          {
            id: String,
            type: 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background',
            metadata: Object,
            ref: String,
            source: String,
            source-layer: String,
            minzoom: Number,
            maxzoom: Number,
            filter: FilterObject,
            layout: LayoutObject,
            paint: PaintObject,
            paint.*: PaintObject,
            before: String,
            popup: {
              enabled: true | false,
              options: PopupOptionsObject,
              message: String
            }
          }
        ]
      }
    */

		controller.getMap().then(function (map) {
      mapboxglScope.$watch('glGeojson.sources', function (geojsonSources) {
        if (angular.isDefined(geojsonSources) && geojsonSources !== null) {
          console.log(geojsonSources);
        }
      }, true);

      mapboxglScope.$watch('glGeojson.layers', function (geojsonLayers) {
        if (angular.isDefined(geojsonLayers) && geojsonLayers !== null) {
          console.log(geojsonLayers);
        }
      }, true);



      // mapboxglScope.$watchCollection('glGeojson', function (geojson) {
      //   if (angular.isDefined(geojson) && geojson !== null) {
      //     $timeout(function () {
      //       geojsonWatched(map, controller, geojson);
      //     }, 500, true);
      //
      //     /*map.on('style.load', function () {
      //       geojsonWatched(map, controller, geojson);
      //     });*/
      //
      //     //geojsonWatched(map, controller, geojson);
      //
      //     /*if (map.style.loaded()) {
      //       geojsonWatched(map, controller, geojson);
      //     } else {
      //       map.style.on('load', function () {
      //         geojsonWatched(map, controller, geojson);
      //       });
      //     }*/
      //   }
      // });
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
