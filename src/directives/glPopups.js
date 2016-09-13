angular.module('mapboxgl-directive').directive('glPopups', ['mapboxglPopupUtils', function (mapboxglPopupUtils) {
  function mapboxGlPopupDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    var _popupsCreated = [];

    var removeAllPopupsCreated = function () {
      _popupsCreated.map(function (eachPopup) {
        eachPopup.remove();
      });

      _popupsCreated = [];
    };

    var popupsWatched = function (map, popups) {
      if (angular.isDefined(popups)) {
        removeAllPopupsCreated();

        if (Object.prototype.toString.call(popups) === Object.prototype.toString.call({})) {
          var popupCreated = mapboxglPopupUtils.createPopupByObject(map, popups);
          _popupsCreated.push(popupCreated);
        } else if (Object.prototype.toString.call(popups) === Object.prototype.toString.call([])) {
          popups.map(function (eachPopup) {
            var eachPopupCreated = mapboxglPopupUtils.createPopupByObject(map, eachPopup);
            _popupsCreated.push(eachPopupCreated);
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
