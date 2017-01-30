angular.module('mapboxgl-directive', []).directive('mapboxgl', ['$q', 'mapboxglUtils', 'mapboxglConstants', 'mapboxglEventsUtils', 'mapboxglMapsData', function ($q, mapboxglUtils, mapboxglConstants, mapboxglEventsUtils, mapboxglMapsData) {
  function mapboxGlDirectiveController ($scope) {
    angular.extend(this, {
      _mapboxGlMap: $q.defer(),
      _geojsonObjects: [],
      _imageObjects: [],
      _videoObjects: [],
      _markerObjects: [],
      _persistentGeojson: mapboxglConstants.map.defaultPersistentGeojson,
      _persistentImage: mapboxglConstants.map.defaultPersistentImage,
      _persistentVideo: mapboxglConstants.map.defaultPersistentVideo,
      _elementDOM: null,

      getMap: function () {
        return this._mapboxGlMap.promise;
      },

      getMapboxGlScope: function () {
        return $scope;
      },

      getDOMElement: function () {
        return this._elementDOM;
      },

      setDOMElement: function (elementDOM) {
        this._elementDOM = elementDOM;
      },

      /* Geojson */
      getGeojsonObjects: function () {
        return this._geojsonObjects;
      },

      addGeojsonObject: function (geojsonObject) {
        this._geojsonObjects.push(geojsonObject);
      },

      removeGeojsonObjects: function () {
        this._geojsonObjects = [];
      },

      /* Image */
      getImageObjects: function () {
        return this._imageObjects;
      },

      addImageObject: function (imageObject) {
        this._imageObjects.push(imageObject);
      },

      removeImageObjects: function () {
        this._imageObjects = [];
      },

      /* Video */
      getVideoObjects: function () {
        return this._videoObjects;
      },

      addVideoObject: function (videoObject) {
        this._videoObjects.push(videoObject);
      },

      removeVideoObjects: function () {
        this._videoObjects = [];
      },

      /* Markers */
      getMarkerObjects: function () {
        return this._markerObjects;
      },

      addMarkerObject: function (markerObject) {
        this._markerObjects.push(markerObject);
      },

      removeMarkerObjects: function () {
        this._markerObjects = [];
      },

      /* Persistent Geojson */
      isGeojsonPersistent: function () {
        return this._persistentGeojson;
      },

      setPersistentGeojson: function (persistentGeojson) {
        this._persistentGeojson = persistentGeojson;
      },

      /* Persistent Image */
      isImagePersistent: function () {
        return this._persistentImage;
      },

      setPersistentImage: function (persistentImage) {
        this._persistentImage = persistentImage;
      },

      /* Persistent Video */
      isVideoPersistent: function () {
        return this._persistentVideo;
      },

      setPersistentVideo: function (persistentVideo) {
        this._persistentVideo = persistentVideo;
      },

      /* Loading Overlay */
      changeLoadingMap: function (map, newValue) {
        if (newValue) {
          if (!this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
            //this.getMap().then(function (map) {
              map.getCanvas().style.opacity = 0.25;
            //});

            this._elementDOM.addClass('angular-mapboxgl-map-loading');
          }
        } else {
          if (this._elementDOM.hasClass('angular-mapboxgl-map-loading')) {
            //this.getMap().then(function (map) {
              map.getCanvas().style.opacity = 1;
            //});

            this._elementDOM.removeClass('angular-mapboxgl-map-loading');
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

    if (angular.isDefined(attrs.rtlEnabled) && mapboxglUtils.stringToBoolean(attrs.rtlEnabled)) {
      if (mapboxgl.setRTLTextPlugin) {
        mapboxgl.setRTLTextPlugin(mapboxglConstants.plugins.rtlPluginUrl);
      } else {
        throw new Error('Your version of Mapbox GL doesn\`t support "setRTLTextPlugin" function.');
      }
    }

    controller.setDOMElement(element);

    scope.mapboxglMapId = attrs.id ? attrs.id : mapboxglUtils.generateMapId();

    element.attr('id', scope.mapboxglMapId);

    var updateWidth = function (map) {
      if (isNaN(attrs.width)) {
        element.css('width', attrs.width);
      } else {
        element.css('width', attrs.width + 'px');
      }

      map.resize();
    };

    var updateHeight = function (map) {
      if (isNaN(attrs.height)) {
        element.css('height', attrs.height);
      } else {
        element.css('height', attrs.height + 'px');
      }

      map.resize();
    };

    var updateLanguage = function (map) {
      if (angular.isDefined(attrs.language)) {
        map.setLayoutProperty('country-label-lg', 'text-field', '{name_' + attrs.language + '}');
      }
    };

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

    var initObject = {
      center: mapboxglConstants.map.defaultCenter,
      zoom: angular.isDefined(scope.glZoom) && scope.glZoom !== null && angular.isDefined(scope.glZoom.value) && scope.glZoom.value !== null ? scope.glZoom.value : mapboxglConstants.map.defaultZoom,
      style: scope.glStyle || mapboxglConstants.map.defaultStyle,
      hash: angular.isDefined(attrs.hash) ? mapboxglUtils.stringToBoolean(attrs.hash) : mapboxglConstants.map.defaultHash,
      bearingSnap: angular.isDefined(attrs.bearingSnap) ? mapboxglUtils.stringToNumber(attrs.bearingSnap) : mapboxglConstants.map.defaultBearingSnap,
      failIfMajorPerformanceCaveat: angular.isDefined(attrs.failIfMajorPerformanceCaveat) ? mapboxglUtils.stringToBoolean(attrs.failIfMajorPerformanceCaveat) : mapboxglConstants.map.defaultFailIfMajorPerformanceCaveat,
      preserveDrawingBuffer: angular.isDefined(attrs.preserveDrawingBuffer) ? mapboxglUtils.stringToBoolean(attrs.preserveDrawingBuffer) : mapboxglConstants.map.defaultPreserveDrawingBuffer,
      trackResize: angular.isDefined(attrs.trackResize) ? mapboxglUtils.stringToBoolean(attrs.trackResize) : mapboxglConstants.map.defaultTrackResize,
      renderWorldCopies: angular.isDefined(attrs.renderWorldCopies) ? mapboxglUtils.stringToBoolean(attrs.renderWorldCopies) : mapboxglConstants.map.defaultRenderWorldCopies
    };

    mapboxglUtils.validateAndFormatCenter(scope.glCenter).then(function (newCenter) {
      if (newCenter) { initObject.center = newCenter; }

      var mapboxGlMap = new mapboxgl.Map({
        container: scope.mapboxglMapId,
        style: initObject.style,
        center: initObject.center,
        zoom: initObject.zoom,
        hash: initObject.hash,
        bearingSnap: initObject.bearingSnap,
        failIfMajorPerformanceCaveat: initObject.failIfMajorPerformanceCaveat,
        preserveDrawingBuffer: initObject.preserveDrawingBuffer,
        trackResize: initObject.trackResize,
        renderWorldCopies: initObject.renderWorldCopies,
        attributionControl: false
      });

      mapboxglMapsData.addMap(scope.mapboxglMapId, mapboxGlMap);

      //scope.isLoading = true;
      //controller.changeLoadingMap(mapboxGlMap, scope.isLoading);

      mapboxGlMap.on('load', function (event) {
        var map = event.target;

        controller._mapboxGlMap.resolve(map);

        mapboxglEventsUtils.exposeMapEvents(map);

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

    });
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
      glInteractive: '=',
      glHandlers: '=',
      glImage: '=',
      glVideo: '=',
      glPopups: '=',
      glMarkers: '=',
      glLights: '=',
      glSources: '=',
      glLayers: '=',

      persistentGeojson: '=',
      persistentImage: '=',
      persistentVideo: '='
    },
    template: '<div class="angular-mapboxgl-map"></div>',
    controller: mapboxGlDirectiveController,
    link: mapboxGlDirectiveLink
  };

  mapboxGlDirectiveController.$inject = ['$scope'];

  return directive;
}]);
