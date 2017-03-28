angular.module('mapboxgl-directive').directive('glMarkers', ['MarkersManager', function (MarkersManager) {
  function mapboxGlMarkersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();
    var popupsManager = controller.getPopupManager();

    var markerManager = new MarkersManager(popupsManager);

    var markersWatched = function (map, markers) {
      if (angular.isDefined(markers)) {
        markerManager.removeAllMarkersCreated();

        if (Object.prototype.toString.call(markers) === Object.prototype.toString.call({})) {
          markerManager.createMarkerByObject(map, markers);
        } else if (Object.prototype.toString.call(markers) === Object.prototype.toString.call([])) {
          markers.map(function (eachMarker) {
            markerManager.createMarkerByObject(map, eachMarker);
          });
        } else {
          throw new Error('Invalid marker parameter');
        }
      }
    };

    controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glMarkers', function (markers) {
        markersWatched(map, markers);
      });
    });

    scope.$on('$destroy', function () {
      // ToDo: remove all markers
      markerManager.removeAllMarkersCreated();
    });
  }

  var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlMarkersDirectiveLink
	};

	return directive;
}]);
