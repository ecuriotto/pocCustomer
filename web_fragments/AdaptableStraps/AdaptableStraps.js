var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentAdaptableStraps', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'c454c663-a828-4a25-89d2-b71701caa7b8\'>\n\n  <div class="col-xs-12  col-sm-12  col-md-3  col-lg-3"\n       ng-class="properties.cssClasses"\n       ng-if="!properties.hidden"\n         ng-repeat="$item in ($collection = properties.repeatedCollection) track by $index"\n       >\n\n        <div class="row">\n        <div pb-property-values=\'3ad94208-cba9-4f5c-8d05-1d66c28388ef\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-image></pb-image>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'3cbfa08f-0069-4390-a49e-99ff625283c9\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div>\n    </div>\n\n\n  </div>\n</div>\n\n    </div>\n</div>'
  };
});
