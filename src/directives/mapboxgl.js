angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'mapboxglUtils', 'mapboxglConstants', 'mapboxglEventsUtils', function ($q, mapboxglUtils, mapboxglConstants, mapboxglEventsUtils) {
  function mapboxGlDirectiveController ($scope) {
    this._mapboxGlMap = $q.defer();
    this._geojsonObjects = [];
    this._imageObjects = [];
    this._videoObjects = [];
    this._markerObjects = [];
    this._persistentGeojson = mapboxglConstants.map.defaultPersistentGeojson;
    this._persistentImage = mapboxglConstants.map.defaultPersistentImage;
    this._persistentVideo = mapboxglConstants.map.defaultPersistentVideo;

    this._elementDOM = null;

    this.getMap = function () {
      return this._mapboxGlMap.promise;
    };

    this.getMapboxGlScope = function () {
      return $scope;
    };

    this.getDOMElement = function () {
      return this._elementDOM;
    };

    this.setDOMElement = function (elementDOM) {
      this._elementDOM = elementDOM;
    };

    /* Geojson */
    this.getGeojsonObjects = function () {
      return this._geojsonObjects;
    };

    this.addGeojsonObject = function (geojsonObject) {
      this._geojsonObjects.push(geojsonObject);
    };

    this.removeGeojsonObjects = function () {
      this._geojsonObjects = [];
    };

    /* Image */
    this.getImageObjects = function () {
      return this._imageObjects;
    };

    this.addImageObject = function (imageObject) {
      this._imageObjects.push(imageObject);
    };

    this.removeImageObjects = function () {
      this._imageObjects = [];
    };

    /* Video */
    this.getVideoObjects = function () {
      return this._videoObjects;
    };

    this.addVideoObject = function (videoObject) {
      this._videoObjects.push(videoObject);
    };

    this.removeVideoObjects = function () {
      this._videoObjects = [];
    };

    /* Markers */
    this.getMarkerObjects = function () {
      return this._markerObjects;
    };

    this.addMarkerObject = function (markerObject) {
      this._markerObjects.push(markerObject);
    };

    this.removeMarkerObjects = function () {
      this._markerObjects = [];
    };

    /* Persistent Geojson */
    this.isGeojsonPersistent = function () {
      return this._persistentGeojson;
    };

    this.setPersistentGeojson = function (persistentGeojson) {
      this._persistentGeojson = persistentGeojson;
    };

    /* Persistent Image */
    this.isImagePersistent = function () {
      return this._persistentImage;
    };

    this.setPersistentImage = function (persistentImage) {
      this._persistentImage = persistentImage;
    };

    /* Persistent Video */
    this.isVideoPersistent = function () {
      return this._persistentVideo;
    };

    this.setPersistentVideo = function (persistentVideo) {
      this._persistentVideo = persistentVideo;
    };

    /* Loading Overlay */
    this.changeLoadingMap = function (newValue) {
      if (newValue) {
        if (!this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
          this.getMap().then(function (map) {
            map.getCanvas().style.opacity = 0.25;
          });

          this._elementDOM.addClass('angular-mapboxgl-map-loading');
        }
      } else {
        if (this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
          this.getMap().then(function (map) {
            map.getCanvas().style.opacity = 1;
          });

          this._elementDOM.removeClass('angular-mapboxgl-map-loading');
        }
      }
    };
  }

  function mapboxGlDirectiveLink (scope, element, attrs, controller) {
    if (!mapboxgl) {
      throw new Error('Mapbox GL does not included');
    }

    if (!mapboxgl.accessToken) {
      if (angular.isDefined(attrs.accessToken) && attrs.accessToken.length > 0) {
        mapboxgl.accessToken = attrs.accessToken;
      } else {
        throw new Error('Mapbox access token does not defined');
      }
    }

    if (!mapboxgl.supported()) {
      throw new Error('Your browser does not support Mapbox GL');
    }

    controller.setDOMElement(element);

    scope.mapboxglMapId = attrs.id ? attrs.id : mapboxglUtils.generateMapId();

    element.attr('id', scope.mapboxglMapId);

    var updateWidth = function () {
      if (isNaN(attrs.width)) {
        element.css('width', attrs.width);
      } else {
        element.css('width', attrs.width + 'px');
      }
    };

    var updateHeight = function () {
      if (isNaN(attrs.height)) {
        element.css('height', attrs.height);
      } else {
        element.css('height', attrs.height + 'px');
      }
    };

    var updateLanguage = function (map) {
      if (angular.isDefined(attrs.language)) {
        map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + attrs.language + '}');
      }
    };

    if (angular.isDefined(attrs.width)) {
      updateWidth();

      scope.$watch(function () {
        return element[0].getAttribute('width');
      }, function () {
        updateWidth();
      });
    }

    if (angular.isDefined(attrs.height)) {
      updateHeight();

      scope.$watch(function () {
        return element[0].getAttribute('height');
      }, function () {
        updateHeight();
      });
    }

    if (angular.isDefined(scope.persistentGeojson) && typeof(scope.persistentGeojson) === 'boolean') {
      controller.setPersistentGeojson(scope.persistentGeojson);

      scope.$watch(function () {
        return scope.persistentGeojson;
      }, function () {
        if (typeof(scope.persistentGeojson) === 'boolean') {
          controller.setPersistentGeojson(scope.persistentGeojson);
        } else {
          throw new Error('Invalid parameter');
        }
      });
    }

    if (angular.isDefined(scope.persistentImage) && typeof(scope.persistentImage) === 'boolean') {
      controller.setPersistentImage(scope.persistentImage);

      scope.$watch(function () {
        return scope.persistentImage;
      }, function () {
        if (typeof(scope.persistentImage) === 'boolean') {
          controller.setPersistentImage(scope.persistentImage);
        } else {
          throw new Error('Invalid parameter');
        }
      });
    }

    if (angular.isDefined(scope.persistentVideo) && typeof(scope.persistentVideo) === 'boolean') {
      controller.setPersistentVideo(scope.persistentVideo);

      scope.$watch(function () {
        return scope.persistentVideo;
      }, function () {
        if (typeof(scope.persistentVideo) === 'boolean') {
          controller.setPersistentVideo(scope.persistentVideo);
        } else {
          throw new Error('Invalid parameter');
        }
      });
    }

    var mapboxGlMap = new mapboxgl.Map({
      container: scope.mapboxglMapId,
      style: scope.glStyle || mapboxglConstants.map.defaultStyle,
      center: mapboxglConstants.map.defaultCenter,
      hash: angular.isDefined(attrs.hash) && typeof(attrs.hash) === 'boolean' ? attrs.hash : mapboxglConstants.map.defaultHash,
      bearingSnap: angular.isDefined(attrs.bearingSnap) && angular.isNumber(attrs.bearingSnap) ? attrs.bearingSnap : mapboxglConstants.map.defaultBearingSnap,
      failIfMajorPerformanceCaveat: angular.isDefined(attrs.failIfMajorPerformanceCaveat) && typeof(attrs.failIfMajorPerformanceCaveat) === 'boolean' ? attrs.failIfMajorPerformanceCaveat : mapboxglConstants.map.defaultFailIfMajorPerformanceCaveat,
      preserveDrawingBuffer: angular.isDefined(attrs.preserveDrawingBuffer) && typeof(attrs.preserveDrawingBuffer) === 'boolean' ? attrs.preserveDrawingBuffer : mapboxglConstants.map.defaultPreserveDrawingBuffer,
      trackResize: angular.isDefined(attrs.trackResize) && typeof(attrs.trackResize) === 'boolean' ? attrs.trackResize : mapboxglConstants.map.defaultTrackResize,
      attributionControl: false
    });

    //scope.isLoading = true;
    //controller.changeLoadingMap(scope.isLoading);

    //mapboxGlMap.on('load', function (map) {
      controller._mapboxGlMap.resolve(mapboxGlMap);

      mapboxglEventsUtils.exposeMapEvents(mapboxGlMap);

      //scope.isLoading = false;
      //controller.changeLoadingMap(scope.isLoading);
    //});

    controller.getMap().then(function (map) {
      // Language
      scope.$watch(function () {
        return attrs.language;
      }, function () {
        if (map.loaded()) {
          updateLanguage(map);
        } else {
          map.on('load', function () {
            updateLanguage(map);
          });
        }
      });
    });

    scope.$on('mapboxglMap:styleChanged', function () {
      controller.getMap().then(function (map) {
        updateLanguage(map);
      });
    });

    scope.$on('$destroy', function () {
      mapboxGlMap.remove();
    });


    /*scope.$watch(function () { return scope.controlsAvailables; }, function (newValue, oldValue) {
      if (newValue !== void 0) {
        // Custom Control DrawGl
        if (newValue.drawControl !== void 0 && newValue.drawControl.enabled !== void 0 && newValue.drawControl.enabled) {
          if (mapboxgl.DrawGl !== void 0) {
            scope.mapboxGlControls.drawGl = new mapboxgl.DrawGl({
              position: newValue.drawControl.position || 'top-left',
              drawOptions: newValue.drawControl.drawOptions ? {
                polyline: newValue.drawControl.drawOptions.polyline ? newValue.drawControl.drawOptions.polyline : false,
                polygon: newValue.drawControl.drawOptions.polygon ? newValue.drawControl.drawOptions.polygon : false,
                rectangle: newValue.drawControl.drawOptions.rectangle ? newValue.drawControl.drawOptions.rectangle : false,
                circle: newValue.drawControl.drawOptions.circle ? newValue.drawControl.drawOptions.circle : false,
                marker: newValue.drawControl.drawOptions.marker ? newValue.drawControl.drawOptions.marker : false,
                edit: newValue.drawControl.drawOptions.edit ? newValue.drawControl.drawOptions.edit : true,
                trash: newValue.drawControl.drawOptions.trash ? newValue.drawControl.drawOptions.trash : true
              } : {
                polyline: true,
                polygon: true,
                rectangle: true,
                circle: true,
                marker: true,
                edit: true,
                trash: true
              },
              distanceUnit: mapboxgl.DrawGl.DISTANCE_UNITS.meters
            });

            scope.mapboxGlMap.addControl(scope.mapboxGlControls.drawGl);
          } else {
            throw new Error('mapboxgl.DrawGl plugin is not included.');
          }
        }
      }
    }); */
  }

  var directive = {
    restrict: 'EA',
    replace: true,
    scope: {
      glStyle: '=',
      glCenter: '=',
      glMinZoom: '=',
      glMaxZoom: '=',
      glZoom: '=',
      glBearing: '=',
      glPitch: '=',
      glControls: '=',
      glFilter: '=',
      glClasses: '=',
      glGeojson: '=',
      glInteractive: '=',
      glHandlers: '=',
      glImage: '=',
      glVideo: '=',
      glPopups: '=',

      persistentGeojson: '=',
      persistentImage: '=',
      persistentVideo: '='
    },
    transclude: true,
    template: '<div class="angular-mapboxgl-map"><div class="loader" ng-if="isLoading"></div><div ng-transclude></div></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);
