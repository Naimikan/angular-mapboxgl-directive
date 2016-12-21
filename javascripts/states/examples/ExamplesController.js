(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ExamplesController', ['$scope', 'examplesAvailables', function ($scope, examplesAvailables) {
    $scope.examplesAvailables = examplesAvailables;
  }]);
})(window.angular);
