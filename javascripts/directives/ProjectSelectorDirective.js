(function (angular) {
  'use strict';

  angular.module('app')

  .directive('projectSelector', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'javascripts/directives/ProjectSelectorDirectiveTemplate.html',
      link: function (scope, element, attrs) {
        scope.projects = [
          {
            href: '#',
            name: 'angular-mapboxgl-directive'
          }, {
            href: 'https://naimikan.github.io/vue2-mapboxgl-component',
            name: 'vue2-mapboxgl-component'
          }
        ];
      }
    };
  }]);
})(window.angular);
