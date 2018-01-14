(function (angular) {
  'use strict';

  angular.module('app.Documentation', [])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('documentation', {
      url: '/api_reference',
      templateUrl: 'javascripts/states/documentation/DocumentationTemplate.html',
      controller: 'DocumentationController'
    });
  }]);
})(window.angular);
