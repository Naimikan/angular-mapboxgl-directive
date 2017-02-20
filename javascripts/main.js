(function (angular, mapboxgl, undefined) {
  'use strict';

  angular.module('app', [
    'ui.router',
    'mapboxgl-directive',
    'hljs',

    'app.Home',
    'app.Examples'
  ])

  .config(['$compileProvider', '$urlRouterProvider', '$locationProvider', function ($compileProvider, $urlRouterProvider, $locationProvider) {
    // Needed for routing to work
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

    $urlRouterProvider.otherwise('/');
  }])

  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }])

  .filter('unsafe', ['$sce', function ($sce) {
    return function (value) {
      if (value) {
        return $sce.trustAsHtml(value);
      }
    };
  }])

  .directive('fullHeight', ['$window', '$document', function ($window, $document) {
    function fullHeightDirectiveLink ($scope, $element, $attrs) {
      var documentHeight = $document[0].body.offsetHeight;

      $element.css('height', documentHeight);
      //$element.css('height', documentHeight);

      angular.element($window).on('resize', function () {
        $scope.$apply(function () {
          var documentHeight = $document[0].body.offsetHeight;

          $element.css('height', documentHeight);
          //$element.css('height', documentHeight);
        });
      });
    }

    return fullHeightDirectiveLink;
  }]);
})(window.angular, window.mapboxgl);
