(function (angular) {
  'use strict';

  angular.module('app.Home', [])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'javascripts/states/home/HomeTemplate.html',
      controller: 'HomeController'
    }).state('home.getstarted', {
      url: '',
      views: {
        '': {
          templateUrl: 'javascripts/states/home/getstarted/GetStartedTemplate.html',
          controller: 'GetStartedController',
        }
      }
    });
  }]);
})(window.angular);
