# angular-mapboxgl-directive
AngularJS directive for Mapbox GL

[![Circle CI](https://circleci.com/gh/Naimikan/angular-mapboxgl-directive/tree/master.svg?style=svg)](https://circleci.com/gh/Naimikan/angular-mapboxgl-directive/tree/master)

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

Include files in your `index.html`:
```html
<script src="angular-mapboxgl-directive.min.js"></script>
```

Add `mapboxgl-directive` module in your AngularJS project:
```javascript
var app = angular.module('YourProject', ['mapboxgl-directive']);
```

### Usage

```html
<mapboxgl></mapboxgl>
```
or
```html
<div mapboxgl></div>
```

### See [Wiki](https://github.com/Naimikan/angular-mapboxgl-directive/wiki) for complete reference.

### Developing
Install dependencies, build the source files and preview

```shell
git clone https://github.com/Naimikan/angular-mapboxgl-directive.git
npm install & bower install
grunt & grunt preview
```
