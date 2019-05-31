var module;
try {
  module = angular.module('bonitasoft.ui.fragments');
} catch (e) {
  module = angular.module('bonitasoft.ui.fragments', []);
  angular.module('bonitasoft.ui').requires.push('bonitasoft.ui.fragments');
}
module.directive('pbFragmentRegisterProductFragment', function() {
  return {
    template: '<div>    <div class="row">\n        <div pb-property-values=\'87af474c-1020-4ae6-8f5d-0f7c3cedc8f1\'>\n    <div ng-if="!properties.hidden" class="component col-md-7  col-sm-12  col-xs-12  col-lg-4" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'b443c9af-d548-4065-87ec-8fc0446ab674\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-2  col-lg-4" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div><div pb-property-values=\'7edd2408-0755-403c-a193-13029a19dba6\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-3  col-lg-4" ng-class="properties.cssClasses">\n        <pb-link></pb-link>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'ea9a08e2-b9f8-43b9-af3c-d25b6c87e3aa\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-9  col-lg-6" ng-class="properties.cssClasses">\n        <pb-text></pb-text>\n    </div>\n</div><div pb-property-values=\'207513d6-799a-48df-ad41-5d92dbf1ba5e\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-3  col-lg-6" ng-class="properties.cssClasses">\n        <pb-button></pb-button>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'471533e3-44bd-45ce-9c9a-edf61fe61821\'>\n\n  <div class="col-xs-12  col-sm-12  col-md-12  col-lg-12"\n       ng-class="properties.cssClasses"\n       ng-if="!properties.hidden"\n>\n\n        <div class="row">\n        <div pb-property-values=\'0a4d4de4-cf31-4a31-ae34-f051b58992ee\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'f32813b6-6bab-4429-b801-2f4dd192205e\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'b0b9ff6e-4b71-4d65-b25b-8eeb96d6d0ad\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'daea81ee-dca3-464a-a813-65c58bd3999e\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'319acae9-cfa7-472a-a2e0-88d4bc93017f\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'216c8bf5-59a3-4804-b52e-997e2998e411\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n    <div class="row">\n        <div pb-property-values=\'7d347dff-4be2-4118-8964-b33b8b3f06e0\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div><div pb-property-values=\'270bdecc-e287-436d-bfaf-3dec9e50721a\'>\n    <div ng-if="!properties.hidden" class="component col-xs-12  col-sm-12  col-md-6  col-lg-6" ng-class="properties.cssClasses">\n        <pb-input></pb-input>\n    </div>\n</div>\n    </div>\n\n\n  </div>\n</div>\n\n    </div>\n</div>'
  };
});