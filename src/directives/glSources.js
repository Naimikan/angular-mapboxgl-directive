angular.module('mapboxgl-directive').directive('glSources', ['mapboxglSourceUtils', '$timeout', '$q', function (mapboxglSourceUtils, $timeout, $q) {
  function mapboxGlSourcesDirectiveLink (scope, element, attrs, controller) {
    if (!controller) {
			throw new Error('Invalid angular-mapboxgl-directive controller');
		}

		var mapboxglScope = controller.getMapboxGlScope();

    function createOrUpdateSource (map, sourceObject) {
      if (mapboxglSourceUtils.existSourceById(sourceObject.id)) {
        mapboxglSourceUtils.updateSourceByObject(map, sourceObject);
      } else {
        mapboxglSourceUtils.createSourceByObject(map, sourceObject);
      }

      setTimeout(function () {
        if (angular.isDefined(sourceObject.animation) && angular.isDefined(sourceObject.animation.enabled) && sourceObject.animation.enabled) {
          var animate = function (timestamp) {
            setTimeout(function () {
              requestAnimationFrame(animate);

              sourceObject.animation.animationFunction(map, sourceObject.id, sourceObject.animation.animationData, timestamp);
            }, sourceObject.animation.timeoutMilliseconds || 1000);
          };

          animate(0);
        }
      }, 500);
    }

    function checkSourcesToBeRemoved (map, sources) {
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

      var sourcesToBeRemoved = mapboxglSourceUtils.getCreatedSources();

      sourcesIds.map(function (eachSourceId) {
        sourcesToBeRemoved = sourcesToBeRemoved.filter(function (eachSourceToBeRemoved) {
          return eachSourceToBeRemoved !== eachSourceId;
        });
      });

      sourcesToBeRemoved.map(function (eachSourceToBeRemoved) {
        mapboxglSourceUtils.removeSourceById(map, eachSourceToBeRemoved);
      });

      defer.resolve();

      return defer.promise;
    }

    controller.getMap().then(function (map) {
      mapboxglScope.$watch('glSources', function (sources) {
        $timeout(function () {
          checkSourcesToBeRemoved(map, sources).then(function () {
            if (Object.prototype.toString.call(sources) === Object.prototype.toString.call([])) {
              sources.map(function (eachSource) {
                createOrUpdateSource(map, eachSource);
              });
            } else if (Object.prototype.toString.call(sources) === Object.prototype.toString.call({})) {
              createOrUpdateSource(map, sources);
            } else {
              throw new Error('Invalid sources parameter');
            }
          }).catch(function (error) {
            throw error;
          });
        }, 500, true);
      }, true);
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
