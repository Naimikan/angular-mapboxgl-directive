(function (angular) {
  'use strict';

  angular.module('app.Home')

  .directive('navigationLinks', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'javascripts/states/home/directives/NavigationLinksDirectiveTemplate.html',
      link: function (scope, element, attrs) {
        scope.navigationLinks = [
          {
            href: '',
            name: 'API Reference'
          }, {
            href: '',
            name: 'Examples'
          }
        ];
      }
    };
  }]);
})(window.angular);
