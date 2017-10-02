angular.module('mapboxgl-directive').directive('glSources', ['SourcesManager', '$timeout', '$q', function (SourcesManager, $timeout, $q) {
  function mapboxGlSourcesDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    function createOrUpdateSource (sourceObject) {
      if (scope.sourceManager.existSourceById(sourceObject.id)) {
        scope.sourceManager.updateSourceByObject(sourceObject);
      } else {
        scope.sourceManager.createSourceByObject(sourceObject);
      }
    }

    function checkSourcesToBeRemoved (sources) {
      var defer = $q.defer();

      var sourcesIds = [];

      if (Object.prototype.toString.call(sources) === Object.prototype.toString.call([])) {
        sourcesIds = sources.map(function (eachSource) {
          return eachSource.id;
        });
      } else if (Object.prototype.toString.call(sources) === Object.prototype.toString.call({})) {
        sourcesIds.push(sources.id);
      } else {
        defer.reject(new Error('Invalid sources parameter'));
      }

      sourcesIds = sourcesIds.filter(function (eachSourceId) {
        return angular.isDefined(eachSourceId);
      });

      var sourcesToBeRemoved = scope.sourceManager.getCreatedSources();

      sourcesIds.map(function (eachSourceId) {
        sourcesToBeRemoved = sourcesToBeRemoved.filter(function (eachSourceToBeRemoved) {
          return eachSourceToBeRemoved.sourceId !== eachSourceId;
        });
      });

      sourcesToBeRemoved.map(function (eachSourceToBeRemoved) {
        scope.sourceManager.removeSourceById(eachSourceToBeRemoved.sourceId);
      });

      defer.resolve();

      return defer.promise;
    }

    function sourcesWatched (sourceObjects) {
      if (angular.isDefined(sourceObjects)) {
        checkSourcesToBeRemoved(sourceObjects).then(function () {
          if (Object.prototype.toString.call(sourceObjects) === Object.prototype.toString.call([])) {
            sourceObjects.map(function (eachSource) {
              createOrUpdateSource(eachSource);
            });
          } else if (Object.prototype.toString.call(sourceObjects) === Object.prototype.toString.call({})) {
            createOrUpdateSource(sourceObjects);
          } else {
            throw new Error('Invalid sources parameter');
          }
        }).catch(function (error) {
          throw error;
        });
      }
    }

    controller.getMap().then(function (map) {
      scope.sourceManager = new SourcesManager(map, controller.getAnimationManager());

      mapboxglScope.$watch('glSources', function (sources) {
        sourcesWatched(sources);
      }, true);
    });

    scope.$on('mapboxglMap:styleChanged', function () {
      if (controller.isPersistent()) {
        scope.sourceManager.recreateSources();
      } else {
        scope.sourceManager.removeAllCreatedSources();
      }
    });

    scope.$on('$destroy', function () {
      if (angular.isDefined(scope.sourceManager)) {
        scope.sourceManager.removeAllCreatedSources();
      }
    });
  }

  var directive = {
    restrict: 'A',
		scope: false,
		replace: false,
		require: '?^mapboxgl',
		link: mapboxGlSourcesDirectiveLink
  };

  return directive;
}]);
