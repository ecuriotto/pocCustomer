(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customWatchStatus', function() {
    return {
      controllerAs: 'ctrl',
      controller: /**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function ($scope) {
    var urlBase = "/bonita/portal/resource/app/AP/cdn/content/assets/img/";
    $scope.urls={
        "stolen":urlBase+($scope.properties.watch.StatusCode==="001"?"stolen_gold.png":"stolen_grey.png"),
        "unrepairable":urlBase+($scope.properties.watch.StatusCode==="003"?"unrepairable_gold.png":"unrepairable_grey.png"),
        "warranty":urlBase+($scope.properties.watch.repairWarranties>0?"AP_Warranty_Gold.png":"AP_Warranty_Grey.png"),
    }
},
      template: '<img ng-src="{{urls.stolen}}" alt="Description" />\n<img ng-src="{{urls.unrepairable}}" alt="Description" />\n<img ng-src="{{urls.warranty}}" alt="Description" />\n\n'
    };
  });
