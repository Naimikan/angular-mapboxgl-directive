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
        var maxScroll = $window.innerHeight * 0.75;

        angular.element($window).bind('scroll', function (e) {
          var scrollTop = this.pageYOffset;

          if (scrollTop === 0) header.css({ 'opacity': 0 })
          else if (scrollTop >= maxScroll) header.css({ 'opacity': 1 })
          else {
            var percentScrolled = scrollTop / maxScroll;

            header.css({ 'opacity': percentScrolled });
          }
        });
      }
    };
  }]);
})(window.angular);
