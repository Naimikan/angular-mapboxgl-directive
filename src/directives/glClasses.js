angular.module('mapboxgl-directive').directive('glClasses', [function () {
	function mapboxGlClassesDirectiveLink (scope, element, attrs, controller) {
		if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

		controller.getMap().then(function (map) {
			mapboxglScope.$watch('glClasses', function (classesObject) {
        if (angular.isDefined(classesObject)) {
          map.setClasses(classesObject.classes, classesObject.options);
        } else {
          var currentClasses = map.getClasses();

          currentClasses.map(function (eachClass) {
            map.removeClass(eachClass);
          });
        }
			}, true);
		});
	}

	var directive = {
		restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlClassesDirectiveLink
	};

	return directive;
}]);
