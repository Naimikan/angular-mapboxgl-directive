angular.module('mapboxgl-directive').directive('glMarkers', ['MarkersManager', function (MarkersManager) {
  function mapboxGlMarkersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();
    var popupsManager = controller.getPopupManager();

    var markersWatched = function (markers) {
      if (angular.isDefined(markers)) {
        scope.markerManager.removeAllMarkersCreated();

        if (Object.prototype.toString.call(markers) === Object.prototype.toString.call({})) {
          scope.markerManager.createMarkerByObject(markers);
        } else if (Object.prototype.toString.call(markers) === Object.prototype.toString.call([])) {
          markers.map(function (eachMarker) {
            scope.markerManager.createMarkerByObject(eachMarker);
          });
        } else {
          throw new Error('Invalid marker parameter');
        }
      }
    };

    controller.getMap().then(function (map) {
      scope.markerManager = new MarkersManager(map, popupsManager);

      mapboxglScope.$watchCollection('glMarkers', function (markers) {
        markersWatched(markers);
      });
    });

    scope.$on('$destroy', function () {
      if (angular.isDefined(scope.markerManager)) {
        // ToDo: remove all markers
        scope.markerManager.removeAllMarkersCreated();
      }
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
