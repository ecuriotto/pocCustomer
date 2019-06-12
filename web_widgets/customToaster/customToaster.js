(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customToaster', function() {
    return {
      controllerAs: 'ctrl',
      controller: function PbToastrCtrl($scope, toaster) {

  'use strict';

  var vm = this;
  $scope.$watchCollection('properties.toasters', function (data) {
        if (!Array.isArray(data)) {
            return;
        }
        if(data.length > 0) {
            var toast = data.shift();
            toaster.pop(toast)
        }
    });
}
,
      template: '<toaster-container toaster-options="{{properties.options}}"></toaster-container>\n'
    };
  });
