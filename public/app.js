(function (angular, mapboxgl, turf, undefined) {
  'use strict';

  angular.module('app', ['mapboxgl-directive'])

  .run([function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFpbWlrYW4iLCJhIjoiY2lraXJkOXFjMDA0OXdhbTYzNTE0b2NtbiJ9.O64XgZQHNHcV2gwNLN2a0Q';
  }])

  .directive('testDirective', [function () {
    var directive = {
      restrict: 'EA',
      scope: true,
      template: '<div>Hola</div>',
      link: function ($scope, $element, $attrs) {
        console.log($scope, $element, $attrs);
      }
    };

    return directive;
  }])

  .controller('IndexController', ['$scope', '$window', '$timeout', 'mapboxglMapsData', '$compile', 'version', function ($scope, $window, $timeout, mapboxglMapsData, $compile, version) {
    $scope.glHeight = $window.innerHeight;
    $scope.glWidth = $window.innerWidth;
    // $scope.glHeight = '450px';
    // $scope.glWidth = '450px';

    var features = [{"type":"Feature","properties":{"id":"50123ed6-3299-4114-8329-1e8bbfbaa2b7","name":"t0","code":"t0","country":"","lat":46.26833333333333,"lon":14.513883333333334,"elev":682,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.513883333333334,46.26833333333333]}},{"type":"Feature","properties":{"id":"69ae19de-57b0-40ad-938e-11aacf231fc6","name":"t1","code":"t1","country":"","lat":46.48833333333334,"lon":14.066383333333333,"elev":1731,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.066383333333333,46.48833333333334]}},{"type":"Feature","properties":{"id":"3d455031-f5ef-4b96-988a-ec514d325cfd","name":"t2","code":"t2","country":"","lat":46.525283333333334,"lon":14.535833333333333,"elev":1446,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.535833333333333,46.525283333333334]}},{"type":"Feature","properties":{"id":"9046b79a-7950-402c-9894-3eabc3e1d12a","name":"Ascension Aux Af","code":"AscensinAxAf","country":"US","lat":-7.969666666666667,"lon":-14.393666666666666,"elev":84.7,"style":"5","rwdir":"130","rwlen":"3053.8m","freq":"","desc":"PRI (FHAW)|RY 13/31:10019x150-ASPH|THE INFORMATION AND DATA CONTAINED HEREIN HAS BEEN PROVIDED BY ENTITIES OUTSIDE OF, AND NOT UNDER THE CONTROL OF, THE FEDERAL AVIATION ADMINISTRATION (FAA). SOURCE DOD FLIP.|EXTENDED-RANGE TWIN-ENGINE OPERATIONS (ETOPS).","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[-14.393666666666666,-7.969666666666667]}},{"type":"Feature","properties":{"id":"8ebca053-3b15-423d-aba1-def91c9c0b5b","name":"100sp2","code":"","country":"","lat":46.29416666666667,"lon":13.218616666666666,"elev":1318,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.218616666666666,46.29416666666667]}},{"type":"Feature","properties":{"id":"eede54c5-8f63-437a-a8bb-9889a47a0622","name":"200sp","code":"","country":"","lat":46.31,"lon":12.715,"elev":1354,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.715,46.31]}},{"type":"Feature","properties":{"id":"c7df7cc6-6b7e-4be0-b955-db883be0341a","name":"abropr","code":"abropr","country":"","lat":46.25111666666667,"lon":14.52945,"elev":467,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.52945,46.25111666666667]}},{"type":"Feature","properties":{"id":"c371c7f5-0781-40f1-976d-9ac3afc5d0e5","name":"ambro","code":"","country":"","lat":46.281666666666666,"lon":14.52695,"elev":1349,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.52695,46.281666666666666]}},{"type":"Feature","properties":{"id":"ec5bd9ad-d23b-4f4f-a1db-89221ed75954","name":"baba","code":"","country":"","lat":46.482216666666666,"lon":14.015833333333333,"elev":1580,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.015833333333333,46.482216666666666]}},{"type":"Feature","properties":{"id":"d193df62-073b-40dc-9a6b-024ecb6c0163","name":"breginj","code":"","country":"","lat":46.25305,"lon":13.42945,"elev":613,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.42945,46.25305]}},{"type":"Feature","properties":{"id":"2b7f3aac-3d87-4720-810f-b69cc95970d8","name":"cilj","code":"","country":"","lat":46.20138333333333,"lon":13.688883333333333,"elev":170,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.688883333333333,46.20138333333333]}},{"type":"Feature","properties":{"id":"29f96510-e6d1-4c41-91b4-f307d10184f9","name":"g1","code":"g1","country":"","lat":46.78138333333333,"lon":13.225,"elev":1821,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.225,46.78138333333333]}},{"type":"Feature","properties":{"id":"f85382b6-22b3-4ced-8bf7-0aced2d46373","name":"gemona","code":"","country":"","lat":46.27278333333334,"lon":13.160833333333333,"elev":860,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.160833333333333,46.27278333333334]}},{"type":"Feature","properties":{"id":"fadcfcb4-73bf-4c39-a0df-081b6fd04be8","name":"gfb1","code":"","country":"","lat":46.71221666666667,"lon":13.361666666666666,"elev":1315,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.361666666666666,46.71221666666667]}},{"type":"Feature","properties":{"id":"b15e1188-20ba-4ae1-a93d-ceec93555271","name":"gfb11","code":"","country":"","lat":46.759166666666665,"lon":12.22195,"elev":1821,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.22195,46.759166666666665]}},{"type":"Feature","properties":{"id":"70ab506e-df57-4335-8473-3cc81a9d3815","name":"gfb2","code":"","country":"","lat":47.079166666666666,"lon":12.81195,"elev":2193,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.81195,47.079166666666666]}},{"type":"Feature","properties":{"id":"b3be4df2-8656-4e97-8d3e-f2a49101ac3c","name":"heligeblut","code":"","country":"","lat":47.051383333333334,"lon":12.89305,"elev":2400,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.89305,47.051383333333334]}},{"type":"Feature","properties":{"id":"e8338155-5a23-4ed1-90d9-f97f680b917e","name":"istra","code":"","country":"","lat":45.1075,"lon":13.917783333333333,"elev":344,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.917783333333333,45.1075]}},{"type":"Feature","properties":{"id":"ec53deca-6541-4366-a4c8-e9ddb2af1716","name":"k1","code":"","country":"","lat":46.25138333333334,"lon":13.577783333333333,"elev":426,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.577783333333333,46.25138333333334]}},{"type":"Feature","properties":{"id":"e8034bb6-5ad5-479f-82a4-800ec99eaf0d","name":"k11","code":"","country":"","lat":46.24945,"lon":13.587783333333334,"elev":242,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.587783333333334,46.24945]}},{"type":"Feature","properties":{"id":"3dafc766-ebf9-4b81-b514-5d34e7fd6199","name":"k13","code":"","country":"","lat":46.238883333333334,"lon":13.58805,"elev":208,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.58805,46.238883333333334]}},{"type":"Feature","properties":{"id":"6563fd3a-1398-42c0-a2df-5353b8b80e53","name":"k2","code":"","country":"","lat":46.25888333333333,"lon":13.447783333333334,"elev":651,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.447783333333334,46.25888333333333]}},{"type":"Feature","properties":{"id":"2bdce5f6-58a1-4c01-99ec-d44d9c0d021d","name":"k23","code":"","country":"","lat":46.27361666666667,"lon":13.46055,"elev":1282,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.46055,46.27361666666667]}},{"type":"Feature","properties":{"id":"27dafdbf-6581-4799-a0b2-fcb4d8a0e32a","name":"k3","code":"","country":"","lat":46.29528333333333,"lon":13.523616666666667,"elev":770,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.523616666666667,46.29528333333333]}},{"type":"Feature","properties":{"id":"3343edd5-9942-460c-95dd-419928ae8fd7","name":"k33","code":"","country":"","lat":46.29805,"lon":13.547783333333333,"elev":1117,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.547783333333333,46.29805]}},{"type":"Feature","properties":{"id":"207da3df-1975-4f84-afd2-15aace8b65ba","name":"kepa","code":"","country":"","lat":46.50528333333333,"lon":13.954716666666666,"elev":2043,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.954716666666666,46.50528333333333]}},{"type":"Feature","properties":{"id":"0f571558-1049-43c8-b305-e90f5c9cb957","name":"koralpe","code":"","country":"","lat":46.72861666666667,"lon":15.118333333333334,"elev":972,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[15.118333333333334,46.72861666666667]}},{"type":"Feature","properties":{"id":"2fb903fa-a729-4aa1-86ef-c5bac42ad234","name":"koralpe2","code":"","country":"","lat":46.90721666666666,"lon":15.087216666666666,"elev":1164,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[15.087216666666666,46.90721666666666]}},{"type":"Feature","properties":{"id":"54a5dbb4-9943-43b6-8db2-0038c2f4adf1","name":"krncica","code":"","country":"","lat":46.298883333333336,"lon":13.63055,"elev":1749,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.63055,46.298883333333336]}},{"type":"Feature","properties":{"id":"2feb81ce-9484-4c70-9e6c-daaa07c97dab","name":"kuk","code":"kuk","country":"","lat":46.194716666666665,"lon":13.62055,"elev":1199,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.62055,46.194716666666665]}},{"type":"Feature","properties":{"id":"dcacc59b-9958-4ff8-b9b3-cc6d7b6556ad","name":"L_1_2","code":"L_1_2","country":"","lat":46.23305,"lon":14.018333333333333,"elev":1350,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.018333333333333,46.23305]}},{"type":"Feature","properties":{"id":"500a75e0-728c-4bc8-a426-9abcd2c1adaf","name":"lajnar","code":"","country":"","lat":46.23028333333333,"lon":14.011116666666666,"elev":1384,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.011116666666666,46.23028333333333]}},{"type":"Feature","properties":{"id":"df6172db-f85f-4d96-bb10-969a43ffc7a2","name":"levico","code":"","country":"","lat":46.04861666666667,"lon":11.288616666666666,"elev":1486,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[11.288616666666666,46.04861666666667]}},{"type":"Feature","properties":{"id":"6eb51d75-413f-4ab5-b7f1-ffed7b0ff755","name":"longarone","code":"","country":"","lat":46.28333333333333,"lon":12.35,"elev":1680,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.35,46.28333333333333]}},{"type":"Feature","properties":{"id":"0d1663ba-01b3-4f26-a94a-8306ac0cd908","name":"misolovka","code":"","country":"","lat":46.310833333333335,"lon":12.634716666666666,"elev":1923,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.634716666666666,46.310833333333335]}},{"type":"Feature","properties":{"id":"61bb7315-7eb0-4700-aff9-7a618cf9a881","name":"rodica","code":"","country":"","lat":46.23,"lon":13.86555,"elev":1794,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.86555,46.23]}},{"type":"Feature","properties":{"id":"8863a191-3e49-4c65-b851-0e42ae1a8b4b","name":"S_TP1","code":"S_TP1","country":"","lat":46.235,"lon":13.620283333333333,"elev":0,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.620283333333333,46.235]}},{"type":"Feature","properties":{"id":"ea1b7b44-0416-40f8-a5c3-0d8e4e42c49e","name":"S_TP2","code":"S_TP2","country":"","lat":46.26721666666667,"lon":12.4625,"elev":0,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.4625,46.26721666666667]}},{"type":"Feature","properties":{"id":"d426cc15-2ed6-4413-b356-612fdbb24e4b","name":"S_TP3","code":"S_TP3","country":"","lat":46.57111666666667,"lon":13.06,"elev":0,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.06,46.57111666666667]}},{"type":"Feature","properties":{"id":"8644da40-016c-48e6-a203-89b4ab5bad63","name":"swinstein","code":"","country":"","lat":47.56055,"lon":11.012216666666667,"elev":1073,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[11.012216666666667,47.56055]}},{"type":"Feature","properties":{"id":"7c98b709-e532-412e-a918-4a9758dbd5b1","name":"t_300p","code":"","country":"","lat":46.26055,"lon":12.0625,"elev":1302,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.0625,46.26055]}},{"type":"Feature","properties":{"id":"98f6e343-2abc-46f7-8aaf-c1c7a8f3efac","name":"t1_300p","code":"","country":"","lat":46.2275,"lon":14.024166666666666,"elev":1090,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.024166666666666,46.2275]}},{"type":"Feature","properties":{"id":"22c314e9-cf46-4bd9-a289-6de143cd25b4","name":"t3h","code":"t3h","country":"","lat":47.3525,"lon":12.39305,"elev":1433,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.39305,47.3525]}},{"type":"Feature","properties":{"id":"60582286-aa86-4812-8c28-620862393024","name":"tb1","code":"","country":"","lat":47.04333333333334,"lon":12.68445,"elev":2715,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.68445,47.04333333333334]}},{"type":"Feature","properties":{"id":"56384d7f-8779-4691-8f24-4affb073e146","name":"tb2","code":"","country":"","lat":46.9625,"lon":11.251383333333333,"elev":3038,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[11.251383333333333,46.9625]}},{"type":"Feature","properties":{"id":"7ff6984e-4a4e-46b9-96cd-63afda7bf470","name":"tb3","code":"","country":"","lat":46.54528333333333,"lon":11.984166666666667,"elev":2064,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[11.984166666666667,46.54528333333333]}},{"type":"Feature","properties":{"id":"3c290fa7-b5a1-4d88-a34f-110f1e9ea31c","name":"tg201","code":"","country":"","lat":46.776383333333335,"lon":12.467216666666667,"elev":2089,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.467216666666667,46.776383333333335]}},{"type":"Feature","properties":{"id":"a5fe72ee-10e7-4a09-88da-0bb4703aabf6","name":"tm1","code":"","country":"","lat":46.24945,"lon":13.9925,"elev":1334,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.9925,46.24945]}},{"type":"Feature","properties":{"id":"1b61a8bb-c79c-4303-85c5-348037594335","name":"tpp3","code":"","country":"","lat":46.297216666666664,"lon":13.60445,"elev":1325,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.60445,46.297216666666664]}},{"type":"Feature","properties":{"id":"d18015bc-22de-4432-a021-faa7a8a9e981","name":"trb3","code":"","country":"","lat":47.138616666666664,"lon":12.4375,"elev":2510,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[12.4375,47.138616666666664]}},{"type":"Feature","properties":{"id":"de172cdc-55d9-4940-b536-afe021bd4736","name":"tss33","code":"","country":"","lat":46.416666666666664,"lon":13.713883333333333,"elev":1669,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.713883333333333,46.416666666666664]}},{"type":"Feature","properties":{"id":"df1542ca-9e37-4c98-bb29-c5ea21925a3c","name":"uršlja","code":"","country":"","lat":46.485283333333335,"lon":14.9775,"elev":1383,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.9775,46.485283333333335]}},{"type":"Feature","properties":{"id":"0a5e793f-88d4-4c5f-8840-c4138a3b0602","name":"vrhnika","code":"","country":"","lat":45.96666666666667,"lon":14.300833333333333,"elev":293,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.300833333333333,45.96666666666667]}},{"type":"Feature","properties":{"id":"f01286c3-27a3-43fc-bf43-94047fe95dba","name":"xx1","code":"xx1","country":"","lat":46.712783333333334,"lon":13.393333333333333,"elev":1508,"style":"1","rwdir":"","rwlen":"","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.393333333333333,46.712783333333334]}},{"type":"Feature","properties":{"id":"6e72823f-4cf7-4b6e-98b6-99a91ae173cb","name":"Gerlamoos","code":"GERLA2","country":"AT","lat":46.760283333333334,"lon":13.284166666666668,"elev":574,"style":"3","rwdir":"70","rwlen":"250.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.284166666666668,46.760283333333334]}},{"type":"Feature","properties":{"id":"8d856d01-2b54-4324-a2ad-85aa319836a1","name":"Greifenbrg","code":"GREFB2","country":"AT","lat":46.74888333333333,"lon":13.205833333333333,"elev":584,"style":"3","rwdir":"70","rwlen":"300.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.205833333333333,46.74888333333333]}},{"type":"Feature","properties":{"id":"1ad58713-6308-4bb4-8c6f-8ef838b6feac","name":"Szatymaz Gld","code":"SZATY","country":"HU","lat":46.32138333333333,"lon":20.053883333333335,"elev":76,"style":"4","rwdir":"140","rwlen":"600.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[20.053883333333335,46.32138333333333]}},{"type":"Feature","properties":{"id":"2946996e-9e3b-407a-9aab-5a150269f0f4","name":"Mittewald","code":"MITWD2","country":"IT","lat":46.806383333333336,"lon":11.577216666666667,"elev":1020,"style":"3","rwdir":"110","rwlen":"300.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[11.577216666666667,46.806383333333336]}},{"type":"Feature","properties":{"id":"40205221-bd03-4103-9973-08d2b9824487","name":"Ortisei Vagarden","code":"ORTIS2","country":"IT","lat":46.58805,"lon":11.629166666666666,"elev":958,"style":"3","rwdir":"0","rwlen":"0.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[11.629166666666666,46.58805]}},{"type":"Feature","properties":{"id":"1d808e64-21a2-43f1-84d7-87948da3c0c7","name":"Schluderns","code":"SCLUD2","country":"IT","lat":46.66166666666667,"lon":10.575283333333333,"elev":920,"style":"3","rwdir":"140","rwlen":"400.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[10.575283333333333,46.66166666666667]}},{"type":"Feature","properties":{"id":"30497e86-9f04-4153-81fa-1d7f0eb668c6","name":"Dolenja Vas","code":"DOLE22","country":"SI","lat":46.209716666666665,"lon":14.223883333333333,"elev":420,"style":"3","rwdir":"0","rwlen":"0.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[14.223883333333333,46.209716666666665]}},{"type":"Feature","properties":{"id":"08032131-c258-45ef-be66-8a52564a916b","name":"Gorica Ul","code":"GORIC2","country":"SI","lat":46.7,"lon":16.144716666666667,"elev":200,"style":"3","rwdir":"10","rwlen":"400.0m","freq":"123.500","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[16.144716666666667,46.7]}},{"type":"Feature","properties":{"id":"d7e44f50-6868-40e9-a440-62299b7194eb","name":"Tolmin","code":"TOLMI2","country":"SI","lat":46.18861666666667,"lon":13.705,"elev":188,"style":"3","rwdir":"130","rwlen":"400.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.705,46.18861666666667]}},{"type":"Feature","properties":{"id":"0cb13b07-b544-41f4-8fa3-ec5d6c242c39","name":"Wocheiner See","code":"WOCHE2","country":"SI","lat":46.285,"lon":13.885,"elev":536,"style":"3","rwdir":"70","rwlen":"300.0m","freq":"","desc":"","userdata":"","pics":""},"geometry":{"type":"Point","coordinates":[13.885,46.285]}}]

    $window.onresize = function (event) {
      $scope.$apply(function () {
        $scope.glHeight = event.target.innerHeight;
        $scope.glWidth = event.target.innerWidth;
      });
    };

    $scope.glStyle = 'mapbox://styles/mapbox/dark-v9';

    $scope.$on('mapboxglMap:controlsRendered', function (event, controlsRendered) {
      console.log(controlsRendered);

      if (controlsRendered.draw) {
        // var mapboxglDrawInstance = controlsRendered.draw.control;
        //
        // var feature = { type: 'Polygon', coordinates: [[[-77.02, 38.91], [-77.01, 38.91], [-77.01, 38.90], [-77.02, 38.90], [-77.02, 38.91]]] };
        //
        // var featureIds = mapboxglDrawInstance.add(feature);
      }
    });

    $scope.$on('mapboxglMap:load', function (event, mapboxglMapEvent) {
      console.log(event, mapboxglMapEvent);
    });

    $scope.$on('mapboxglMap:styleChanged', function (event, mapboxglMapEvent) {
      console.log(event, mapboxglMapEvent);
    });

    $scope.$on('mapboxglDirections:route', function (event, mapboxglDirectionsEvent) {
      console.log(event, mapboxglDirectionsEvent);
    });

    $scope.$on('mapboxglGeolocate:geolocate', function (event, mapboxglGeolocateEvent) {
      console.log(event, mapboxglGeolocateEvent);
    });

    $scope.$on('mapboxglGeocoder:loading', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:results', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:result', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglGeocoder:error', function (event, mapboxglGeocoderEvent) {
      console.log(event, mapboxglGeocoderEvent);
    });

    $scope.$on('mapboxglDraw:draw.create', function (event, mapboxglDrawEvent) {
      console.log(event, mapboxglDrawEvent);
    });

    // $scope.glControls = {
    //   navigation: {
    //     enabled: true,
    //     options: {
    //       position: 'top-left'
    //     }
    //   },
    //   scale: {
    //     enabled: true,
    //     options: {
    //       position: 'bottom-left'
    //     }
    //   },
    //   attribution: {
    //     enabled: true,
    //     options: {
    //       compact: true
    //     }
    //   },
    //   geocoder: {
    //     enabled: true,
    //     options: {
    //       accessToken: mapboxgl.accessToken
    //     }
    //   },
    //   geolocate: {
    //     enabled: true
    //   },
    //   fullscreen: {
    //     enabled: true,
    //     options: {
    //       position: 'top-right'
    //     }
    //   },
    //   language: {
    //     enabled: true,
    //     options: {
    //       defaultLanguage: 'fr'
    //     }
    //   }
    // };

    $scope.glControls = {
      draw: {
        enabled: true,
        features: features
      }
    };

    $scope.glSources = [];
    $scope.glLayers = [];

    var features = [];
    var counter = 0;

    var colors = ['#0DAAFF', '#FF620D'];
    var routes = [
      {
        origin: [-122.414, 37.776],
        destination: [-77.032, 38.913]
      }, {
        origin: [-2.15, 41.776],
        destination: [-77.032, 38.913]
      }
    ];

    features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: routes[0].origin
        },
        properties: {
          radius: 8,
          animation: {
            enabled: false,
            animationData: {
              origin: routes[0].origin,
              destination: routes[0].destination,
              speed: 5,
              speedUnit: 'meters'
            },
            animationFunction: function (map, sourceId, featureId, feature, animationData, deltaTime, end) {
              var arc = [];

              var route = {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [feature.geometry.coordinates, animationData.destination]
                }
              };

              // Calculate the distance in kilometers between route start/end point.
              var lineDistance = turf.lineDistance(route, animationData.speedUnit);
              var segment = feature.geometry.coordinates;

              if (lineDistance > 0) {
                segment = turf.along(route, animationData.speed, animationData.speedUnit);
              }

              feature.properties.radius = Math.cos(deltaTime / 500) * 20 < 5 ? 5 : Math.cos(deltaTime / 500) * 20;

              feature.geometry.coordinates = segment.geometry.coordinates;

              if (feature.geometry.coordinates[0] >= animationData.destination[0]) {
                console.log('end');
                end();
              }

              // feature.geometry.coordinates[0] += 0.1;
              // feature.geometry.coordinates[1] += 0.05;
              //
              // if (timestamp >= 8000) {
              //    end();
              // }
            }
          }
        }
      }
    ];


    // for (var iterator = 0; iterator < 2; iterator++) {
    //   /*var tempLng = (Math.random() * (180 - (-180)) + 180).toFixed(5) * 1;
    //   var tempLat = (Math.random() * (90 - (-90)) + 90).toFixed(5) * 1;
    //
    //   var tempLng2 = (Math.random() * (180 - (-180)) + 180).toFixed(5) * 1;
    //   var tempLat2 = (Math.random() * (90 - (-90)) + 90).toFixed(5) * 1;*/
    //
    //   features.push({
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: angular.copy(routes[iterator].origin)
    //       //coordinates: [tempLng, tempLat]
    //     },
    //     properties: {
    //       //lattitude: tempLat,
    //       //longitude: tempLng,
    //       animation: {
    //         enabled: true,
    //         animationData: {
    //           origin: angular.copy(routes[iterator].origin),
    //           destination: angular.copy(routes[iterator].destination),
    //           generateRoute: function (newOrigin, newDestination) {
    //             var arc = [];
    //
    //             var route = {
    //               type: 'Feature',
    //               geometry: {
    //                 type: 'LineString',
    //                 coordinates: [newOrigin, newDestination]
    //               }
    //             };
    //
    //             // Calculate the distance in kilometers between route start/end point.
    //             var lineDistance = turf.lineDistance(route, 'meters');
    //
    //             if (lineDistance > 0) {
    //               // Draw an arc between the `origin` & `destination` of the two points
    //               for (var i = 0; i < lineDistance; i++) {
    //                 var segment = turf.along(route, i / 1000 * lineDistance, 'meters');
    //                 arc.push(segment.geometry.coordinates);
    //               }
    //
    //               // Update the route with calculated arc coordinates
    //               route.geometry.coordinates = arc;
    //             }
    //
    //             return route;
    //           }
    //         },
    //         animationFunction: function (map, sourceId, featureId, feature, animationData, timestamp, end) {
    //           feature.geometry.coordinates[0] += 1;
    //           feature.geometry.coordinates[1] += 0.05;
    //
    //           console.log(feature.geometry.coordinates[0]);
    //
    //           if (feature.geometry.coordinates[0] >= 100) {
    //             end();
    //           }
    //
    //           counter += 1;
    //
    //           // var route = animationData.generateRoute(animationData.origin, animationData.destination);
    //           //
    //           // if (route && route.geometry && route.geometry.coordinates && route.geometry.coordinates[counter]) {
    //           //   feature.geometry.coordinates = route.geometry.coordinates[counter];
    //           //
    //           //   if (feature.geometry.coordinates[0] === animationData.destination[0]) {
    //           //     end();
    //           //   }
    //           //
    //           //   counter = counter + 1;
    //           // }
    //         }
    //       }
    //     }
    //   });
    // }

    $scope.glSources = [
      {
        id: 'circles',
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      }, {
        id: 'circles2',
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [2.15, 41.39]
              },
              properties: {
                radius: 'Feature 1',
                animation: {
                  enabled: false,
                  animationFunction: function (map, sourceId, featureId, feature, animationData, deltaTime, end) {
                    feature.geometry.coordinates = [
                      Math.cos(deltaTime / 250) * 70,
                      Math.sin(deltaTime / 2500) * 20
                    ];

                    feature.properties.radius = Math.cos(deltaTime / 500) * 20 < 5 ? 5 : Math.cos(deltaTime / 500) * 20;

                    // if (timestamp >= 20000) {
                    //   end();
                    // }
                  }
                }
              }
            }, {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: routes[1].origin
              },
              properties: {
                radius: 'Feature 2',
                animation: {
                  enabled: false,
                  animationFunction: function (map, sourceId, featureId, feature, animationData, timestamp, end) {
                    feature.geometry.coordinates = [
                      Math.cos(timestamp / 500) * 70,
                      Math.sin(timestamp / 500) * 20
                    ];

                    //console.log(timestamp);

                    if (timestamp >= 15000) {
                      end();
                    }
                  }
                }
              }
            }
          ]
        }
      }
    ];

    $scope.glLayers = [
      {
        id: 'circles',
        type: 'circle',
        source: 'circles',
        paint: {
          'circle-radius': 15,
          'circle-color': '#FF620D'
        },
        popup: {
          enabled: true,
          onClick: {
            message: '<div class="metar-popup"><p>${radius}</p></div>',
            coordinates: 'center'
          }
        }
      }, {
        id: 'circles2',
        type: 'circle',
        source: 'circles2',
        paint: {
          'circle-radius': 12,
          'circle-color': '#006AFC'
        },
        popup: {
          enabled: true,
          onClick: {
            message: '<div class="metar-popup"><p>${radius}</p></div>',
            coordinates: 'center',
            onClose: function (event, popupClosed) {
              console.log(event, popupClosed);
            }
          }
          // onMouseover: {
          //   message: '<div class="metar-popup"><p>${radius}</p></div>',
          //   onClose: function (event, popupClosed) {
          //     console.log(event, popupClosed);
          //   }
          // }
        }
      }
    ];


















    var tempGlSources = [];
    var tempGlLayers = [];

    for (var iterator = 0; iterator < 10; iterator++) {
      var tempLng = Math.floor(Math.random() * -180) + 180;
      var tempLat = Math.floor(Math.random() * -90) + 90;

      tempGlSources.push({
        id: 'circle' + iterator,
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [tempLng, tempLat]
          }
        },
        /*animation: {
          enabled: true,
          animationData: {
            timeoutMilliseconds: 1000 / 15,
            radius: 20
          },
          animationFunction: function (map, sourceId, animationData, timestamp) {
            var newSourceData = {
              type: 'Point',
              coordinates: [
                Math.cos(timestamp / 1000) * animationData.radius,
                Math.sin(timestamp / 1000) * animationData.radius
              ]
            };

            map.getSource(sourceId).setData(newSourceData);
          }
        }*/
      });

      tempGlLayers.push({
        id: 'circle' + iterator,
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 8,
          'circle-color': '#007cbf',
          'circle-opacity': 1
        }
      });

      /*tempGlLayers.push({
        id: 'circle' + iterator + '_animation',
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 8,
          'circle-radius-transition': { duration: 0 },
          'circle-opacity-transition': { duration: 0 },
          'circle-color': '#007cbf',
        },
        animation: {
          enabled: true,
          animationData: {
            timeoutMilliseconds: 1000 / 25,
            initialOpacity: 1,
            opacity: 1,
            initialRadius: 11,
            radius: 11,
            maxRadius: 22
          },
          animationFunction: function (map, layerId, animationData) {
            animationData.radius += (animationData.maxRadius - animationData.radius) / animationData.speed;
            animationData.opacity -= (0.9 / animationData.speed);

            map.setPaintProperty(layerId, 'circle-radius', animationData.radius);
            map.setPaintProperty(layerId, 'circle-opacity', animationData.opacity);

            if (animationData.opacity <= 0) {
              animationData.radius = animationData.initialRadius;
              animationData.opacity = animationData.initialOpacity;
            }
          }
        }
      });*/

      tempGlLayers.push({
        id: 'circle' + iterator + '_before',
        type: 'circle',
        source: 'circle' + iterator,
        paint: {
          'circle-radius': 11,
          'circle-color': 'white',
          'circle-opacity': 1
        },
        before: 'circle' + iterator
      });
    }
  }]);
})(window.angular, window.mapboxgl, window.turf);
