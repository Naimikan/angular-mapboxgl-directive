## 0.44.0 (March 5, 2018)

#### Improvements
- Add support for Mapbox GL v0.44.1
- Add `pitchWithRotate`, `refreshExpiredTiles`, `maxTileCacheSize`, `localIdeographFontFamily` and `collectResourceTiming` attributes for `mapboxgl` directive

## 0.43.3 (Jan 9, 2018)

#### Bug fixes
- Fix update of source without data #39

## 0.43.2 (Jan 8, 2018)

#### Improvements
- Add support for relative urls in utils.isUrl method

## 0.43.1 (Jan 8, 2018)

#### Bug fixes
- Fix assignament of center when user cancel autodiscover.

## 0.43.0 (Nov 11, 2017)

#### Improvements
- Add support for url format in source.data property

## 0.42.0 (Nov 11, 2017)

#### Improvements
- Add `features` attribute in `glControls.draw` #32, #37
- Add `mapboxglMap:controlsRendered` event

## 0.39.0 (Aug 1, 2017)

#### Improvements
- Add support for Mapbox GL v0.39.1
- Add `trackuserlocationstart` and `trackuserlocationend` events in `GeolocateControl`

## 0.38.0 (Jul 11, 2017)

#### Improvements
- Add support for Mapbox GL v0.38.0
- Add support for MapboxLanguage plugin

## 0.37.0 (May 12, 2017)

#### Improvements
- Add support for Mapbox GL v0.37.0

## 0.36.1 (April 22, 2017)

#### Bug fixes
- Fix update language #24

## 0.36.0 (April 21, 2017)

#### Breaking changes
- Remove 'persistent' functionality (`persistent-geojson`, `persistent-image`, `persistent-video`)
- Refactor popups creation #22
- Refactor markers creation #22

#### Bug fixes
- Fix markers with popups #22

#### Improvements
- Add CHANGELOG.md
- Remove old code
- Pass `mapInstance` to managers
