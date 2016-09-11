angular.module('mapboxgl-directive').constant('mapboxglConstants', {
	map: {
		defaultStyle: 'mapbox://styles/mapbox/streets-v9',
		defaultCenter: [0, 0],
		defaultHash: false,
		defaultBearingSnap: 7,
		defaultFailIfMajorPerformanceCaveat: false,
		defaultPreserveDrawingBuffer: false,
		defaultTrackResize: true,

		defaultPersistentGeojson: true,
		defaultPersistentImage: true,
		defaultPersistentVideo: true
	},
	source: {
		defaultMaxZoom: 18,
		defaultBuffer: 128,
		defaultTolerance: 0.375,
		defaultCluster: false,
		defaultClusterRadius: 50
	}
});
