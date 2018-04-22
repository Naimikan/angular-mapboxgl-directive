angular.module('mapboxgl-directive').constant('version', {
	full: '0.46.0',
	major: 0,
	minor: 46,
	patch: 0
});

angular.module('mapboxgl-directive').constant('mapboxglConstants', {
	map: {
		defaultHeight: '450px',
		defaultStyle: 'mapbox://styles/mapbox/streets-v9',
		defaultCenter: [0, 0],
		defaultZoom: 0,
		defaultHash: false,
		defaultBearingSnap: 7,
		defaultPitchWithRotate: true,
		defaultFailIfMajorPerformanceCaveat: false,
		defaultPreserveDrawingBuffer: false,
		defaultTrackResize: true,
		defaultRefreshExpiredTiles: true,
		defaultRenderWorldCopies: true,
		defaultMaxTileCacheSize: null,
		defaultLocalIdeographFontFamily: null,
		defaultCollectResourceTiming: false,
		defaultLogoPosition: 'bottom-left'
	},
	source: {
		defaultMaxZoom: 18,
		defaultBuffer: 128,
		defaultTolerance: 0.375,
		defaultCluster: false,
		defaultClusterRadius: 50
	},
	plugins: {
		rtlPluginUrl: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js'
	}
});

angular.module('mapboxgl-directive').constant('mapboxglControlsAvailables', [
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
	},/* {
		name: 'logo',
		constructor: mapboxgl.LogoControl,
		pluginName: 'mapboxgl.LogoControl'
	}, */{
		name: 'geolocate',
		constructor: mapboxgl.Geolocate || mapboxgl.GeolocateControl,
		pluginName: 'mapboxgl.' + (mapboxgl.Geolocate ? mapboxgl.Geolocate.name : mapboxgl.GeolocateControl.name),
		eventsExposedName: 'mapboxglGeolocate',
		eventsAvailables: [
			'geolocate',
			'error',
			'trackuserlocationstart',
			'trackuserlocationend'
		]
	}, {
		name: 'geocoder',
		constructor: mapboxgl.Geocoder || window.MapboxGeocoder,
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
		name: 'language',
		constructor: window.MapboxLanguage || undefined,
		pluginName: 'MapboxLanguage'
	}, {
		name: 'fullscreen',
		constructor: mapboxgl.FullscreenControl || undefined,
		pluginName: mapboxgl.FullscreenControl ? 'mapboxgl.' + mapboxgl.FullscreenControl.name : 'mapboxgl.FullscreenControl'
	}, {
		name: 'directions',
		constructor: mapboxgl.Directions || window.MapboxDirections,
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
		constructor: mapboxgl.Draw || window.MapboxDraw,
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
]);
