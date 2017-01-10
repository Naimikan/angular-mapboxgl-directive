(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ExamplesController', ['$scope', 'examplesAvailables', 'examplesTypes', function ($scope, examplesAvailables, examplesTypes) {
    $scope.examplesAvailables = examplesAvailables;
    $scope.examplesTypes = examplesTypes;
  }]);
})(window.angular);
