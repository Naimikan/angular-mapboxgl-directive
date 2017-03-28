angular.module('mapboxgl-directive').directive('glPopups', [function () {
  function mapboxGlPopupDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();
    var popupsManager = controller.getPopupManager();

    var popupsWatched = function (map, popups) {
      if (angular.isDefined(popups)) {
        popupsManager.removeAllPopupsCreated();

        if (Object.prototype.toString.call(popups) === Object.prototype.toString.call({})) {
          popupsManager.createPopupByObject(map, popups);
        } else if (Object.prototype.toString.call(popups) === Object.prototype.toString.call([])) {
          popups.map(function (eachPopup) {
            popupsManager.createPopupByObject(map, eachPopup);
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
      popupsManager.removeAllPopupsCreated();
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
