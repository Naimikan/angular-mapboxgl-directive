'use strict';

module.exports = function (grunt) {
	require('load-grunt-config')(grunt);
	grunt.config('package', grunt.file.readJSON('package.json'));
};