angular.module('mapboxgl-directive').provider('interactiveLayers', [function () {
  var interactiveLayers = [];

  return {
    setLayers: function (newInteractiveLayers) {
      interactiveLayers = newInteractiveLayers;
    },

    addLayer: function (newInterativeLayer) {
      interactiveLayers.push(newInterativeLayer);
    },

    $get: function () {
      return {
        layers: interactiveLayers
      };
    }
  };
}]);
