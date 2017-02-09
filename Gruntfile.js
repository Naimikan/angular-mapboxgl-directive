'use strict';

var loadGruntConfig = require('load-grunt-config');

module.exports = function (grunt) {
	loadGruntConfig(grunt);
	grunt.config('package', grunt.file.readJSON('package.json'));
};
