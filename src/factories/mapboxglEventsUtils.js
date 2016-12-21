angular.module('mapboxgl-directive').factory('mapboxglEventsUtils', ['$rootScope', function ($rootScope) {
  var eventsAvailables = [
    'resize',
    'webglcontextlost',
    'webglcontextrestored',
    'remove',
    'mouseup',
    'mousedown',
    'mouseout',
    'render',
    'tiledataloading',
    'movestart',
    'contextmenu',
    'dblclick',
    'click',
    'touchcancel',
    'touchmove',
    'touchend',
    'touchstart',
    'sourcedataloading',
    'styledataloading',
    'mousemove',
    'load',
    'move',
    'moveend',
    'error',
    'data',
    'styledata',
    'sourcedata',
    'dataloading',
    'tiledata',
    'zoomend',
    'zoom',
    'zoomstart',
    'boxzoomstart',
    'boxzoomcancel',
    'boxzoomend',
    'rotatestart',
    'rotate',
    'rotateend',
    'dragend',
    'drag',
    'dragstart',
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
