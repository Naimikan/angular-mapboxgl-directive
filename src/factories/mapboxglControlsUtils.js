angular.module('mapboxgl-directive').factory('mapboxglControlsUtils', ['$window', 'mapboxglUtils', function ($window, mapboxglUtils) {
  var _controlsCreated = {
    custom: []
  };

  var _controlsAvailables = [
    {
      name: 'navigation',
      constructor: mapboxgl.Navigation || mapboxgl.NavigationControl,
      pluginName: 'mapboxgl.' + (mapboxgl.Navigation ? mapboxgl.Navigation.name : mapboxgl.NavigationControl.name)
    }, {
      name: 'scale',
      constructor: mapboxgl.Scale || mapboxgl.ScaleControl,
      pluginName: 'mapboxgl.' + (mapboxgl.Scale ? mapboxgl.Scale.name : mapboxgl.ScaleControl.name)
    }, {
      name: 'attribution',
      constructor: mapboxgl.Attribution || mapboxgl.AttributionControl,
      pluginName: 'mapboxgl.' + (mapboxgl.Attribution ? mapboxgl.Attribution.name : mapboxgl.AttributionControl.name)
    }, {
      name: 'logo',
      constructor: mapboxgl.LogoControl,
      pluginName: 'mapboxgl.LogoControl'
    }, {
      name: 'geolocate',
      constructor: mapboxgl.Geolocate || mapboxgl.GeolocateControl,
      pluginName: 'mapboxgl.' + (mapboxgl.Geolocate ? mapboxgl.Geolocate.name : mapboxgl.GeolocateControl.name),
      eventsExposedName: 'mapboxglGeolocate',
      eventsAvailables: [
        'geolocate',
        'error'
      ]
    }, {
      name: 'geocoder',
      constructor: mapboxgl.Geocoder || $window.MapboxGeocoder,
      pluginName: mapboxgl.Geocoder ? 'mapboxgl.Geocoder' : 'MapboxGeocoder',
      eventsExposedName: 'mapboxglGeocoder',
      eventsAvailables: [
        'clear',
        'loading',
        'results',
        'result',
        'error'
      ]
    }, {
      name: 'directions',
      constructor: mapboxgl.Directions || $window.MapboxDirections,
      pluginName: mapboxgl.Directions ? 'mapboxgl.Directions' : 'MapboxDirections',
      eventsExposedName: 'mapboxglDirections',
      eventsAvailables: [
        'clear',
        'loading',
        'profile',
        'origin',
        'destination',
        'route',
        'error'
      ]
    }, {
      name: 'draw',
      constructor: mapboxgl.Draw || $window.MapboxDraw,
      pluginName: mapboxgl.Draw ? 'mapboxgl.Draw' : 'MapboxDraw',
      eventsExposedName: 'mapboxglDraw',
      listenInMap: true,
      eventsAvailables: [
        'draw.create',
        'draw.delete',
        'draw.combine',
        'draw.uncombine',
        'draw.update',
        'draw.selectionchange',
        'draw.modechange',
        'draw.render',
        'draw.actionable'
      ]
    }
  ];

  function getControlsAvailables () {
    return _controlsAvailables;
  }

  function getControlsCreated () {
    return _controlsCreated;
  }

  function setControlsCreated (newControlsCreated) {
    _controlsCreated = newControlsCreated;
  }

  function addNewControlCreated (controlName, newControl, isCustomControl, controlEvents, isEventsListenedByMap) {
    if (isCustomControl) {
      _controlsCreated.custom.push({
        name: controlName || 'customControl_' + mapboxglUtils.generateGUID(),
        control: newControl,
        isEventsListenedByMap: angular.isDefined(isEventsListenedByMap) ? isEventsListenedByMap : false,
        events: angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : []
      });
    } else {
      _controlsCreated[controlName] = {
        control: newControl,
        isEventsListenedByMap: angular.isDefined(isEventsListenedByMap) ? isEventsListenedByMap : false,
        events: angular.isDefined(controlEvents) && angular.isArray(controlEvents) ? controlEvents : []
      };
    }
  }

  function removeEventsFromControl (control, events, isEventsListenedByMap, map) {
    if (isEventsListenedByMap) {
      events.map(function (eachEvent) {
        map.off(eachEvent);
      });
    } else {
      events.map(function (eachEvent) {
        control.off(eachEvent);
      });
    }
  }

  function removeAllControlsCreated (map) {
    for (var attribute in _controlsCreated) {
      if (attribute !== 'custom') {
        var controlToRemove = _controlsCreated[attribute];

        removeEventsFromControl(controlToRemove.control, controlToRemove.events, controlToRemove.isEventsListenedByMap, map);

        map.removeControl(controlToRemove.control);
      } else {
        var customControls = _controlsCreated[attribute];

        for (var iterator = 0, length = customControls.length; iterator < length; iterator++) {
          var eachCustomControl = customControls[iterator];

          removeEventsFromControl(eachCustomControl.control, eachCustomControl.events, eachCustomControl.isEventsListenedByMap, map);

          map.removeControl(eachCustomControl.control);
        }
      }
    }

    // Reset controls created
    _controlsCreated = {
      custom: []
    };
  }

  function removeControlCreatedByName (map, controlName) {
    var found = false, removed = false;

    for (var attribute in _controlsCreated) {
      if (controlName === attribute) {
        found = _controlsCreated[attribute];
      }
    }

    if (!found) {
      _controlsCreated.custom.map(function (eachCustomControl) {
        if (eachCustomControl.name === controlName) {
          found = eachCustomControl.control;
        }
      });
    }

    if (found) {
      try {
        removeEventsFromControl(found.control, found.events, found.isEventsListenedByMap, map);

        map.removeControl(found.control);
        removed = true;
      } catch (error) {
        throw new Error('Error removing control \'' + controlName + '\' --> ' + error);
      }
    }

    return removed;
  }

  var mapboxglControlsUtils = {
    getControlsAvailables: getControlsAvailables,
    getControlsCreated: getControlsCreated,
    setControlsCreated: setControlsCreated,
    addNewControlCreated: addNewControlCreated,
    removeEventsFromControl: removeEventsFromControl,
    removeAllControlsCreated: removeAllControlsCreated,
    removeControlCreatedByName: removeControlCreatedByName
  };

  return mapboxglControlsUtils;
}]);
