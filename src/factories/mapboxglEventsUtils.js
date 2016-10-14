angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'resize',
    'webglcontextlost',
    'webglcontextrestored',
    'remove',
    'dataloading',
    'render',
    'mouseout',
    'mousedown',
    'load',
    'data',
    'mouseup',
    'mousemove',
    'touchstart',
    'touchend',
    'touchmove',
    'touchcancel',
    'click',
    'dblclick',
    'contextmenu',
    'error',
    'movestart',
    'move',
    'moveend',
    'zoomstart',
    'zoomend',
    'zoom',
    'boxzoomcancel',
    'boxzoomend',
    'boxzoomstart',
    'rotatestart',
    'rotate',
    'rotateend',
    'dragstart',
    'dragend',
    'drag',
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
