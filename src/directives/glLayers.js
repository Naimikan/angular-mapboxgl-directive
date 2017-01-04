angular.module('mapboxgl-directive').directive('glLayers', ['mapboxglLayerUtils', 'mapboxglPopupUtils', '$timeout', '$q', function (mapboxglLayerUtils, mapboxglPopupUtils, $timeout, $q) {
  function mapboxGlLayersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    function disableLayerEvents (map) {
      mapboxglPopupUtils.removeAllPopupsCreated(map);

      map.off('click');
      map.off('mousemove');
    }

    function enableLayerEvents (map) {
      map.on('click', function (event) {
        var allLayers = mapboxglLayerUtils.getCreatedLayers();

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });

        if (features.length > 0) {
          var feature = features[0];

          var popupObject = mapboxglLayerUtils.getPopupRelationByLayerId(feature.layer.id);

          mapboxglPopupUtils.createPopupByObject(map, {
            coordinates: event.point,
            options: popupObject.options,
            html: popupObject.message,
            getScope: popupObject.getScope
          }, feature.layer.id);
        }
      });

      map.on('mousemove', function (event) {
        var allLayers = mapboxglLayerUtils.getCreatedLayers();

        var features = map.queryRenderedFeatures(event.point, { layers: allLayers });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      });
    }

    function createOrUpdateLayer (map, layerObject) {
      if (mapboxglLayerUtils.existLayerById(layerObject.id)) {
        mapboxglLayerUtils.updateLayerByObject(map, layerObject);
      } else {
        mapboxglLayerUtils.createLayerByObject(map, layerObject);
      }
    }

    function checkLayersToBeRemoved (map, layers) {
      var defer = $q.defer();

      var layersIds = [];

      if (Object.prototype.toString.call(layers) === Object.prototype.toString.call([])) {
        layersIds = layers.map(function (eachLayer) {
          return eachLayer.id;
        });
      } else if (Object.prototype.toString.call(layers) === Object.prototype.toString.call({})) {
        layersIds.push(layers.id);
      } else {
        defer.reject(new Error('Invalid layers parameter'));
      }

      layersIds = layersIds.filter(function (eachLayerId) {
        return angular.isDefined(eachLayerId);
      });

      var layersToBeRemoved = mapboxglLayerUtils.getCreatedLayers();

      layersIds.map(function (eachLayerId) {
        layersToBeRemoved = layersToBeRemoved.filter(function (eachLayerToBeRemoved) {
          return eachLayerToBeRemoved !== eachLayerId;
        });
      });

      layersToBeRemoved.map(function (eachLayerToBeRemoved) {
        mapboxglLayerUtils.removeLayerById(map, eachLayerToBeRemoved);
      });

      defer.resolve();

      return defer.promise;
    }

    controller.getMap().then(function (map) {
      mapboxglScope.$watch('glLayers', function (layers) {
        $timeout(function () {
          disableLayerEvents(map);

          checkLayersToBeRemoved(map, layers).then(function () {
            if (Object.prototype.toString.call(layers) === Object.prototype.toString.call([])) {
              layers.map(function (eachLayer) {
                createOrUpdateLayer(map, eachLayer);
              });
            } else if (Object.prototype.toString.call(layers) === Object.prototype.toString.call({})) {
              createOrUpdateLayer(map, layers);
            } else {
              throw new Error('Invalid layers parameter');
            }

            enableLayerEvents(map);
          }).catch(function (error) {
            throw error;
          });
        }, 500, true);
      }, true);
    });
  }

  var directive = {
    restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlLayersDirectiveLink
  };

  return directive;
}]);
