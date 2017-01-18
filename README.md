[![NPM version][npm-image]][npm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
<!-- [![Bower version][bower-image]][bower-url] -->
[![License][license-image]](LICENSE)

# angular-mapboxgl-directive
AngularJS directive for Mapbox GL

### Installation

NPM
```shell
npm install angular-mapboxgl-directive --save
```

Bower
```shell
bower install angular-mapboxgl-directive --save
```

### Get Started

Include the files in your `index.html`:
```html
<link href="angular-mapboxgl-directive.css" rel="stylesheet" />

<script src="angular-mapboxgl-directive.min.js"></script>
```

Or you can include them from CDN:
```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/angular-mapboxgl-directive/X.X.X/angular-mapboxgl-directive.min.css" rel="stylesheet" />

<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-mapboxgl-directive/X.X.X/angular-mapboxgl-directive.min.js"></script>
```

Add `mapboxgl-directive` module in your AngularJS project:
```javascript
var app = angular.module('YourProject', ['mapboxgl-directive']);
```

### Usage

#### mapboxgl

```html
<mapboxgl></mapboxgl>
```
or
```html
<div mapboxgl></div>
```

#### mapboxglCompare

```html
<mapboxgl-compare>
   <mapboxgl></mapboxgl>
   <mapboxgl></mapboxgl>
</mapboxgl-compare>
```
or
```html
<div mapboxgl-compare>
   <div mapboxgl></div>
   <div mapboxgl></div>
</div>
```

### See [Wiki](https://github.com/Naimikan/angular-mapboxgl-directive/wiki) for complete reference.

### Developing
Install dependencies, build the source files and preview

```shell
git clone https://github.com/Naimikan/angular-mapboxgl-directive.git
npm install & bower install
grunt & grunt preview
```

<!-- Urls -->
[npm-image]: https://img.shields.io/npm/v/angular-mapboxgl-directive.svg?style=flat-square
[bower-image]: https://img.shields.io/bower/v/angular-mapboxgl-directive.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/angular-mapboxgl-directive.svg?style=flat-square
[codeclimate-image]: https://codeclimate.com/github/Naimikan/angular-mapboxgl-directive/badges/gpa.svg

[npm-url]: https://www.npmjs.com/package/angular-mapboxgl-directive
[bower-url]: https://bower.io/search/?q=angular-mapboxgl-directive
[codeclimate-url]: https://codeclimate.com/github/Naimikan/angular-mapboxgl-directive
