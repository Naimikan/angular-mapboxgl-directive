(function (angular) {
  'use strict';

  angular.module('app.Examples')

  .controller('ShowCustomControlController', ['$scope', function ($scope) {
    function CustomControl (options) {
      this.options = this.options || {};

      angular.extend(this.options, options);
    }

    CustomControl.prototype = new mapboxgl.Evented();

    CustomControl.prototype.onAdd = function (map) {
      var self = this;

      self.map = map;

      var container = document.createElement('div');
      container.className = 'mapboxgl-ctrl';

      map.getContainer().appendChild(container);

      var buttonContainer = document.createElement('div');
      var button = document.createElement('button');
      button.className = 'mapboxgl-ctrl-icon';
      button.style.height = '30px';
      button.style.width = '30px';
      button.style['background-color'] = '#EF444D';

      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        self.fire('buttonClicked', event);
      });

      buttonContainer.appendChild(button);

      container.appendChild(buttonContainer);

      return container;
    };

    $scope.glControls = {
      custom: [
        {
          constructor: CustomControl,
          name: 'CustomControl1',
          options: {
            position: 'bottom-right'
          },
          events: ['buttonClicked']
        }
      ]
    };

    $scope.$on('mapboxgl:CustomControl1:buttonClicked', function (event, controlEvent) {
      alert(event.name);
    });
  }]);
})(window.angular);
