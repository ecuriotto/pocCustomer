var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentTechDatas', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'ed52e6ea-9fda-4031-a711-3dc2ebb72307\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-data-table></pb-data-table>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
