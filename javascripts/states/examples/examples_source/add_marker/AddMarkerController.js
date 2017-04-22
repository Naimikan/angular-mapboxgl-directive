(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('AddMarkerController', ['$scope', function ($scope) {
    function createElement (iconSize) {
      var element = document.createElement('div');
      element.style.backgroundImage = 'url(https://placekitten.com/g/' + iconSize.width + '/' + iconSize.height + '/)';
      element.style.width = iconSize.width + 'px';
      element.style.height = iconSize.height + 'px';
      element.style.borderRadius = '50%';

      return element;
    }

    $scope.glMarkers = [
      {
        coordinates: [-99.20415, 19.42257],
        element: createElement({
          width: 50,
          height: 50
        })
      }, {
        coordinates: [-99.10415, 19.44257],
        element: createElement({
          width: 35,
          height: 35
        })
      }
    ];
  }]);
})(window.angular);