<p align="right">
  <a href="https://www.npmjs.com/package/angular-mapboxgl-directive">
    <img src="https://img.shields.io/npm/v/angular-mapboxgl-directive.svg" alt="version" />
  </a>
  <a href="https://bower.io/search/?q=angular-mapboxgl-directive">
    <img src="https://img.shields.io/bower/v/angular-mapboxgl-directive.svg" alt="bower version" />
  </a>
  <a href="https://cdnjs.com/libraries/angular-mapboxgl-directive">
    <img src="https://img.shields.io/cdnjs/v/angular-mapboxgl-directive.svg" alt="cdnjs version" />
  </a>
  <a href="https://codeclimate.com/github/Naimikan/angular-mapboxgl-directive">
    <img src="https://codeclimate.com/github/Naimikan/angular-mapboxgl-directive/badges/gpa.svg" alt="codeclimate" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/npm/l/angular-mapboxgl-directive.svg" alt="license" />
  </a>
</p>

<h1 align="center">angular-mapboxgl-directive | <a href="https://github.com/Naimikan/angular-mapboxgl-directive/wiki">Wiki</a></h1>

<h5 align="center">AngularJS directive for Mapbox GL</h5>

<p align="center"><img src="pinpinmap png.png" width="350" /></p>

<h2 align="center">Installation</h2>

NPM
```shell
npm install angular-mapboxgl-directive --save
```

Bower
```shell
bower install angular-mapboxgl-directive --save
```

<h2 align="center">Get Started</h2>

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

<h2 align="center">Usage</h2>

<h5>mapboxgl</h5>

```html
<mapboxgl></mapboxgl>
```
or
```html
<div mapboxgl></div>
```

<h5>mapboxglCompare</h5>

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

<h2 align="center">Developing</h2>

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
