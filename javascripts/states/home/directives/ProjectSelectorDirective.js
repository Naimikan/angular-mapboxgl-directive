(function (angular) {
  'use strict';

  angular.module('app.Home')

  .directive('projectSelector', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'javascripts/states/home/directives/ProjectSelectorDirectiveTemplate.html',
      link: function (scope, element, attrs) {
        scope.projects = [
          {
            href: 'https://naimikan.github.io/angular-mapboxgl-directive',
            name: 'angular-mapboxgl-directive'
          }, {
            href: 'https://naimikan.github.io/vue2-mapboxgl-component',
            name: 'vue2-mapboxgl-component'
          }
        ];

        $timeout(function () {
          element.on('hover', function (event) {
            console.log(event);
          });
        }, 0);
      }
    };
  }]);
})(window.angular);
