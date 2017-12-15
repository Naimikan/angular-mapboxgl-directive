(function (angular) {
  'use strict';

  angular.module('app.Home')

  .directive('pageHeader', ['$window', function ($window) {
    return {
      restrict: 'EA',
      scope: true,
      templateUrl: 'javascripts/states/home/directives/HeaderDirectiveTemplate.html',
      link: function (scope, element, attrs) {
        var header = angular.element(element[0].getElementsByClassName('bg'));
        var range = 200;

        angular.element($window).bind('scroll', function (e) {
          var scrollTop = $(this).scrollTop();
          var height = $(header[0]).outerHeight();
          var offset = height / 2;
          var calc = 1 - (scrollTop - offset + range) / range;

          header.css({ 'opacity': calc });

          if (calc > '1') header.css({ 'opacity': 1 });
          else if (calc < '0') header.css({ 'opacity': 0 })
        });
      }
    };
  }]);
})(window.angular);
