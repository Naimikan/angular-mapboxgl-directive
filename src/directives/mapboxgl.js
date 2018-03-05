angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'Utils', 'mapboxglConstants', 'mapboxglEventsUtils', 'mapboxglMapsData', 'AnimationsManager', 'PopupsManager', function ($q, Utils, mapboxglConstants, mapboxglEventsUtils, mapboxglMapsData, AnimationsManager, PopupsManager) {
  function mapboxGlDirectiveController ($scope) {
    var mapboxGlMap = $q.defer();

    angular.extend(this, {
      _mapboxGlMap: mapboxGlMap,
      _elementDOM: null,
      _animationManager: new AnimationsManager(mapboxGlMap),
      _popupManager: new PopupsManager(mapboxGlMap),
      _isPersistent: false,

      getMap: function () {
        return this._mapboxGlMap.promise;
      },

      getMapboxGlScope: function () {
        return $scope;
      },

      getDOMElement: function () {
        return this._elementDOM;
      },

      getAnimationManager: function () {
        return this._animationManager;
      },

      getPopupManager: function () {
        return this._popupManager;
      },

      setDOMElement: function (elementDOM) {
        this._elementDOM = elementDOM;
      },

      setIsPersistent: function (isPersistent) {
        this._isPersistent = isPersistent;
      },

      isPersistent: function () {
        return this._isPersistent;
      },

      /* Loading Overlay */
      changeLoadingMap: function (newValue) {
        var functionToExecute = newValue ? 'addClass' : 'removeClass';
        var elements = this._elementDOM.find('div');

        for (var iterator = 0; iterator < elements.length; iterator++) {
          var element = angular.element(elements[iterator]);

          if (element.hasClass('angular-mapboxgl-map-loader')) {
            element[functionToExecute]('angular-mapboxgl-map-loading');
          }
        }
      }
    });
  }

  function mapboxGlDirectiveLink (scope, element, attrs, controller) {
    if (!mapboxgl) {
      throw new Error('Mapbox GL doesn\`t included');
    }

    if (!mapboxgl.accessToken) {
      if (angular.isDefined(attrs.accessToken) && attrs.accessToken.length > 0) {
        mapboxgl.accessToken = attrs.accessToken;
      } else {
        throw new Error('Mapbox access token doesn\`t defined');
      }
    }

    if (!mapboxgl.supported()) {
      throw new Error('Your browser doesn\`t support Mapbox GL');
    }

    if (angular.isDefined(attrs.rtlEnabled) && Utils.stringToBoolean(attrs.rtlEnabled)) {
      if (mapboxgl.setRTLTextPlugin) {
        mapboxgl.setRTLTextPlugin(mapboxglConstants.plugins.rtlPluginUrl);
      } else {
        throw new Error('Your version of Mapbox GL doesn\`t support "setRTLTextPlugin" function.');
      }
    }

    if (angular.isDefined(attrs.persistent) && Utils.stringToBoolean(attrs.persistent)) {
      controller.setIsPersistent(Utils.stringToBoolean(attrs.persistent));
    }

    controller.setDOMElement(element);
    controller.changeLoadingMap(true);
    scope.mapboxglMapId = attrs.id ? attrs.id : Utils.generateMapId();
    element.attr('id', scope.mapboxglMapId);

    var updateWidth = function (map) {
      if (isNaN(attrs.width)) {
        element.css('width', attrs.width);
      } else {
        element.css('width', attrs.width + 'px');
      }

      if (angular.isDefined(map) && map !== null) {
        map.resize();
      }
    };

    var updateHeight = function (map) {
      var newHeight = attrs.height;

      if (angular.isUndefined(newHeight) || newHeight === null) {
        newHeight = mapboxglConstants.map.defaultHeight;
      }

      if (isNaN(newHeight)) {
        element.css('height', newHeight);
      } else {
        element.css('height', newHeight + 'px');
      }

      if (angular.isDefined(map) && map !== null) {
        map.resize();
      }
    };

    updateWidth();
    updateHeight();

    var updateLanguage = function (map) {
      if (angular.isDefined(attrs.language)) {
        map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + attrs.language + '}');
      }
    };

    var initObject = {
      container: scope.mapboxglMapId,
      style: scope.glStyle || mapboxglConstants.map.defaultStyle,
      center: mapboxglConstants.map.defaultCenter,
      zoom: angular.isDefined(scope.glZoom) && scope.glZoom !== null && angular.isDefined(scope.glZoom.value) && scope.glZoom.value !== null ? scope.glZoom.value : mapboxglConstants.map.defaultZoom,
      hash: angular.isDefined(attrs.hash) ? Utils.stringToBoolean(attrs.hash) : mapboxglConstants.map.defaultHash,
      bearingSnap: angular.isDefined(attrs.bearingSnap) ? Utils.stringToNumber(attrs.bearingSnap) : mapboxglConstants.map.defaultBearingSnap,
      pitchWithRotate: angular.isDefined(attrs.pitchWithRotate) ? Utils.stringToBoolean(attrs.pitchWithRotate) : mapboxglConstants.map.defaultPitchWithRotate,
      logoPosition: angular.isDefined(attrs.logoPosition) ? attrs.logoPosition : mapboxglConstants.map.defaultLogoPosition,
      failIfMajorPerformanceCaveat: angular.isDefined(attrs.failIfMajorPerformanceCaveat) ? Utils.stringToBoolean(attrs.failIfMajorPerformanceCaveat) : mapboxglConstants.map.defaultFailIfMajorPerformanceCaveat,
      preserveDrawingBuffer: angular.isDefined(attrs.preserveDrawingBuffer) ? Utils.stringToBoolean(attrs.preserveDrawingBuffer) : mapboxglConstants.map.defaultPreserveDrawingBuffer,
      refreshExpiredTiles: angular.isDefined(attrs.refreshExpiredTiles) ? Utils.stringToBoolean(attrs.refreshExpiredTiles) : mapboxglConstants.map.defaultRefreshExpiredTiles,
      trackResize: angular.isDefined(attrs.trackResize) ? Utils.stringToBoolean(attrs.trackResize) : mapboxglConstants.map.defaultTrackResize,
      renderWorldCopies: angular.isDefined(attrs.renderWorldCopies) ? Utils.stringToBoolean(attrs.renderWorldCopies) : mapboxglConstants.map.defaultRenderWorldCopies,
      maxTileCacheSize: angular.isDefined(attrs.maxTileCacheSize) ? Utils.stringToNumber(attrs.maxTileCacheSize) : mapboxglConstants.map.defaultMaxTileCacheSize,
      localIdeographFontFamily: angular.isDefined(attrs.localIdeographFontFamily) ? attrs.localIdeographFontFamily : mapboxglConstants.map.defaultLocalIdeographFontFamily,
      collectResourceTiming: angular.isDefined(attrs.collectResourceTiming) ? Utils.stringToBoolean(attrs.collectResourceTiming) : mapboxglConstants.map.defaultCollectResourceTiming,
      attributionControl: false
    };

    Utils.validateAndFormatCenter(scope.glCenter).then(function (newCenter) {
      if (newCenter) { initObject.center = newCenter; }

      var mapboxGlMap = new mapboxgl.Map(initObject);

      mapboxglMapsData.addMap(scope.mapboxglMapId, mapboxGlMap);

      mapboxglEventsUtils.exposeMapEvents(mapboxGlMap);
      controller.getAnimationManager().initAnimationSystem();

      //scope.isLoading = true;
      //controller.changeLoadingMap(mapboxGlMap, scope.isLoading);

      mapboxGlMap.on('load', function (event) {
        var map = event.target;

        controller._mapboxGlMap.resolve(map);
        controller.changeLoadingMap(false);

        // Language
        scope.$watch(function () {
          return attrs.language;
        }, function () {
          updateLanguage(map);
        });

        // showCollisionBoxes
        scope.$watch(function () {
          return attrs.showCollisionBoxes;
        }, function () {
          if (typeof(attrs.showCollisionBoxes) === 'boolean') {
            map.showCollisionBoxes = attrs.showCollisionBoxes;
          }
        });

        // showTileBoundaries
        scope.$watch(function () {
          return attrs.showTileBoundaries;
        }, function () {
          if (typeof(attrs.showTileBoundaries) === 'boolean') {
            map.showTileBoundaries = attrs.showTileBoundaries;
          }
        });

        // repaint
        scope.$watch(function () {
          return attrs.repaint;
        }, function () {
          if (typeof(attrs.repaint) === 'boolean') {
            map.repaint = attrs.repaint;
          }
        });

        // Width
        if (angular.isDefined(attrs.width)) {
          updateWidth(map);

          scope.$watch(function () {
            return element[0].getAttribute('width');
          }, function () {
            updateWidth(map);
          });
        }

        // Height
        if (angular.isDefined(attrs.height)) {
          updateHeight(map);

          scope.$watch(function () {
            return element[0].getAttribute('height');
          }, function () {
            updateHeight(map);
          });
        } else {
          element.css('height', mapboxglConstants.map.defaultHeight);

          map.resize();
        }

        //scope.isLoading = false;
        //controller.changeLoadingMap(map, scope.isLoading);
      });

      scope.$on('mapboxglMap:styleChanged', function () {
        controller.getMap().then(function (map) {
          updateLanguage(map);
        });
      });

      scope.$on('$destroy', function () {
        if (angular.isDefined(controller.getAnimationManager())) {
          controller.getAnimationManager().destroy();
        }

        if (angular.isDefined(controller.getPopupManager())) {
          controller.getPopupManager().removeAllPopupsCreated();
        }

        mapboxglMapsData.removeMapById(scope.mapboxglMapId);

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
    }).catch(function (error) {
      console.error(error);
    });
  }

  var directive = {
    restrict: 'EA',
    replace: true,
    scope: {
      glBearing: '=',
      glCenter: '=',
      glClasses: '=',
      glControls: '=',
      glFilter: '=',
      glHandlers: '=',
      glImage: '=',
      glInteractive: '=',
      glLayers: '=',
      glLights: '=',
      glMarkers: '=',
      glMaxBounds: '=',
      glMaxZoom: '=',
      glMinZoom: '=',
      glPitch: '=',
      glPopups: '=',
      glSources: '=',
      glStyle: '=',
      glVideo: '=',
      glZoom: '='
    },
    template: '<div class="angular-mapboxgl-map"><div class="angular-mapboxgl-map-loader"><div class="spinner"><div class="double-bounce"></div><div class="double-bounce delayed"></div></div></div></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);
