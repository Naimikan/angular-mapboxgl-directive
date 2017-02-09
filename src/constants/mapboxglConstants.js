angular.module('mapboxgl-directive').constant('mapboxglConstants', {
	map: {
		defaultHeight: '450px',
		defaultStyle: 'mapbox://styles/mapbox/streets-v9',
		defaultCenter: [0, 0],
		defaultZoom: 0,
		defaultHash: false,
		defaultBearingSnap: 7,
		defaultFailIfMajorPerformanceCaveat: false,
		defaultPreserveDrawingBuffer: false,
		defaultTrackResize: true,
		defaultRenderWorldCopies: true,
		defaultLogoPosition: 'bottom-left',

		defaultPersistentGeojson: false,
		defaultPersistentImage: false,
		defaultPersistentVideo: false
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
