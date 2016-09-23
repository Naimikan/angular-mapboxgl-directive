(function (angular, mapboxgl, undefined) {
  'use strict';

  angular.module('app', [
    'ui.router',
    'mapboxgl-directive',

    'app.Home'
  ])

  .config(['$compileProvider', '$urlRouterProvider', function ($compileProvider, $urlRouterProvider) {
    // Needed for routing to work
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

    $urlRouterProvider.otherwise('/');
  }])

  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }]);
})(window.angular, window.mapboxgl);
