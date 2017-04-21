angular.module('mapboxgl-directive').factory('MarkersManager', ['Utils', 'mapboxglConstants', '$rootScope', '$compile', function (Utils, mapboxglConstants, $rootScope, $compile) {
  function MarkersManager (mapInstance, popupManger) {
    this.markersCreated = [];
    this.mapInstance = mapInstance;

    if (angular.isDefined(popupManger) && popupManger !== null) {
      this.popupManger = popupManger;
    }
  }

  MarkersManager.prototype.createMarkerByObject = function (object) {
    Utils.checkObjects([
      {
        name: 'Map',
        object: this.mapInstance
      }, {
        name: 'Object',
        object: object,
        attributes: ['coordinates', 'element']
      }
    ]);

    var elementId = object.element.getAttribute('id');
    elementId = angular.isDefined(elementId) && elementId !== null ? elementId : Utils.generateGUID();

    object.element.setAttribute('id', elementId);

    var markerOptions = object.options || {};

    var marker = new mapboxgl.Marker(object.element, markerOptions).setLngLat(object.coordinates);

    if (angular.isDefined(object.popup) && angular.isDefined(object.popup.enabled) && object.popup.enabled) {
      var popup = this.popupManger.createPopupByObject({
        coordinates: object.popup.coordinates,
        options: object.popup.options,
        message: object.popup.message,
        getScope: object.popup.getScope,
        onClose: object.popup.onClose
      });

      marker.setPopup(popup);
    }

    marker.addTo(this.mapInstance);

    this.markersCreated.push({
      markerId: elementId,
      markerInstance: marker
    });
  };

  MarkersManager.prototype.removeAllMarkersCreated = function () {
    this.markersCreated.map(function (eachMarker) {
      eachMarker.markerInstance.remove();
    });

    this.markersCreated = [];
  };

  return MarkersManager;
}]);
