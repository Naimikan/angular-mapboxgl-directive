(function (angular) {
  'use strict';

  angular.module('app')

  .directive('navigationLinks', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'javascripts/directives/NavigationLinksDirectiveTemplate.html',
      link: function (scope, element, attrs) {
        scope.navigationLinks = [
          {
            href: '',
            name: 'API Reference'
          }, {
            href: 'examples.simple_map',
            name: 'Examples'
          }
        ];
      }
    };
  }]);
})(window.angular);
