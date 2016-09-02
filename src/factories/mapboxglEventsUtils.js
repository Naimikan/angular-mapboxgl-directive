angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'webglcontextlost ',
    'webglcontextrestored',
    'error',
    'render',
    'mouseout',
    'mousedown',
    'mouseup',
    'mousemove',
    'touchstart',
    'touchend',
    'touchmove',
    'touchcancel',
    'click',
    'dblclick',
    'contextmenu',
    'load',
    'movestart',
    'moveend',
    'move',
    'zoomend',
    'zoomstart',
    'zoom',
    'boxzoomend',
    'boxzoomcancel',
    'boxzoomstart',
    'rotatestart',
    'rotateend',
    'rotate',
    'dragstart',
    'drag',
    'dragend',
    'pitch'
  ];

  function exposeMapEvents (map) {
    eventsAvailables.map(function (eachEvent) {
      map.on(eachEvent, function (event) {
        $rootScope.$broadcast('mapboxglMap:' + eachEvent, event);
      });
    });
  }

  var mapboxglEventsUtils = {
    exposeMapEvents: exposeMapEvents
	};

	return mapboxglEventsUtils;
}]);
