angular.module('mapboxgl-directive').factory('MarkersManager', ['Utils', 'mapboxglConstants', '$rootScope', '$compile', function (Utils, mapboxglConstants, $rootScope, $compile) {
  function MarkersManager (popupManger) {
    this.markersCreated = [];

    if (angular.isDefined(popupManger) && popupManger !== null) {
      this.popupManger = popupManger;
    }
  }

  MarkersManager.prototype.createMarkerByObject = function (map, object) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: map
      }, {
        name: 'Object',
        object: object,
        attributes: ['coordinates', 'element']
      }
    ]);

    var markerOptions = object.options || {};

    var marker = new mapboxgl.Marker(object.element, markerOptions)
      .setLngLat(object.coordinates);

    if (angular.isDefined(object.popup)) {
      var popup = this.popupManger.createPopupByObject(map, object.popup);
      marker.setPopup(popup);
    }

    marker.addTo(map);

    this.markersCreated.push(marker);
  };

  MarkersManager.prototype.removeAllMarkersCreated = function () {
    this.markersCreated.map(function (eachMarker) {
      eachMarker.remove();
    });

    this.markersCreated = [];
  };

  return MarkersManager;
}]);
