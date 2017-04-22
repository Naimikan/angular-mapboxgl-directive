(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('AttachPopupMarkerController', ['$scope', function ($scope) {
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
        }),
        options: {
          offset: [-25, -25]
        },
        popup: {
          enabled: true,
          message: 'Marker 1 message',
          options: {
            offset: 25
          }
        }
      }, {
        coordinates: [-99.10415, 19.44257],
        element: createElement({
          width: 40,
          height: 40
        }),
        options: {
          offset: [-20, -20]
        },
        popup: {
          enabled: true,
          message: 'Marker 2 Message',
          options: {
            offset: 20
          }
        }
      }
    ];
  }]);
})(window.angular);
