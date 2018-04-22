angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'resize',
    'webglcontextlost',
    'webglcontextrestored',
    'remove',
    'contextmenu',
    'styledata',
    'data',
    'error',
    'moveend',
    'move',
    'touchmove',
    'touchend',
    'movestart',
    'touchcancel',
    'load',
    'sourcedataloading',
    'dblclick',
    'click',
    'touchstart',
    'mousemove',
    'mouseup',
    'mousedown',
    'styledataloading',
    'dataloading',
    'mouseout',
    'render',
    'sourcedata',
    'zoom',
    'zoomend',
    'zoomstart',
    'boxzoomstart',
    'boxzoomend',
    'boxzoomcancel',
    'rotate',
    'rotatestart',
    'rotateend',
    'drag',
    'dragstart',
    'dragend',
    'pitch',
    'pitchstart',
    'pitchend'
  ];

  function exposeMapEvents (map) {
    eventsAvailables.map(function (eachEvent) {
      map.on(eachEvent, function (event) {
        $rootScope.$applyAsync($rootScope.$broadcast('mapboxglMap:' + eachEvent, event));
      });
    });
  }

  var mapboxglEventsUtils = {
    exposeMapEvents: exposeMapEvents
	};

	return mapboxglEventsUtils;
}]);
