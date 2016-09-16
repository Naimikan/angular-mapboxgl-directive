angular.module('mapboxgl-directive').directive('glMarkers', ['mapboxglMarkerUtils', function (mapboxglMarkerUtils) {
  function mapboxGlMarkersDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var _markersCreated = [];

    var removeAllMarkersCreated = function () {
      _markersCreated.map(function (eachMarker) {
        eachMarker.remove();
      });

      _markersCreated = [];
    };

    var markersWatched = function (map, markers) {
      if (angular.isDefined(markers)) {
        removeAllMarkersCreated();

        if (Object.prototype.toString.call(markers) === Object.prototype.toString.call({})) {
          var markerCreated = mapboxglMarkerUtils.createMarkerByObject(map, markers);
          _markersCreated.push(markerCreated);
        } else if (Object.prototype.toString.call(markers) === Object.prototype.toString.call([])) {
          markers.map(function (eachMarker) {
            var eachMarkerCreated = mapboxglMarkerUtils.createMarkerByObject(map, eachMarker);
            _markersCreated.push(eachMarkerCreated);
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
