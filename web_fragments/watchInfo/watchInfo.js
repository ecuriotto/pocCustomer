var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentWatchInfo', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'22a6fd50-ff20-4868-b190-49837eec459e\'>\n\n  <div class="col-xs-12  col-sm-12  col-md-10  col-lg-10"\n       ng-class="properties.cssClasses"\n       ng-if="!properties.hidden"\n>\n\n        <div class="row">\n        <div pb-property-values=\'4f2317cc-1382-4ab7-ab1e-059a08b6770a\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'f3481e7c-64ca-4078-abe7-367210ba476e\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <custom-watch-status></custom-watch-status>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'12f02325-6761-4574-95ea-a264c65ccaa4\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'9ce9e5f7-46fa-4a40-922e-c4acba6a7767\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'98f25a7d-481a-459f-ad38-8c4ad852e6ce\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-12  col-lg-12" ng-class="properties.cssClasses">\n        <pb-textarea></pb-textarea>\n    </div>\n</div>\n    </div>\n\n\n  </div>\n</div>\n<div pb-property-values=\'03647d0a-47ce-4126-9c94-11869083021b\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-2  col-lg-2" ng-class="properties.cssClasses">\n        <pb-image></pb-image>\n    </div>\n</div>\n    </div>\n</div>'
  };
});
