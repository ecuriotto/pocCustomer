var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentBillOfMaterial', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'aab60ac2-3da7-45de-96c5-3b9d508d71f3\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-9  col-lg-9" ng-class="properties.cssClasses">\n        <custom-exp-table-bill-of-material></custom-exp-table-bill-of-material>\n    </div>\n</div><div pb-property-values=\'a3f11e0b-dd76-4e80-b67b-1d87589a7929\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-3  col-lg-3" ng-class="properties.cssClasses">\n        <pb-file-viewer></pb-file-viewer>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
