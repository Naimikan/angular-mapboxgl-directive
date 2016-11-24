(function (angular) {
  'use strict';

  angular.module('app.Home', [
    'app.Examples'
  ])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'javascripts/states/home/HomeTemplate.html',
      controller: 'HomeController'
    });
  }]);
})(window.angular);
