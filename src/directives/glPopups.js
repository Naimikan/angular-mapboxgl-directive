angular.module('mapboxgl-directive').directive('glPopups', ['mapboxglPopupUtils', function (mapboxglPopupUtils) {
  function mapboxGlPopupDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var popupsWatched = function (map, popups) {
      if (angular.isDefined(popups)) {
        mapboxglPopupUtils.removeAllPopupsCreated();

        if (Object.prototype.toString.call(popups) === Object.prototype.toString.call({})) {
          mapboxglPopupUtils.createPopupByObject(map, popups);
        } else if (Object.prototype.toString.call(popups) === Object.prototype.toString.call([])) {
          popups.map(function (eachPopup) {
            mapboxglPopupUtils.createPopupByObject(map, eachPopup);
          });
        } else {
          throw new Error('Invalid popup parameter');
        }
      }
    };

    controller.getMap().then(function (map) {
      mapboxglScope.$watchCollection('glPopups', function (popups) {
        popupsWatched(map, popups);
      });
    });

    scope.$on('$destroy', function () {
      mapboxglPopupUtils.removeAllPopupsCreated();
    });
  }

  var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlPopupDirectiveLink
	};

	return directive;
}]);
