(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customExpTableBillOfMaterial', function() {
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
    
    $scope.selectToDisplay = function(item){
        $scope.properties.selected = item;
    }
    
    $scope.toggleRow = function (item,parent) {
        if($scope.selected && $scope.selected.componentNumber == item.componentNumber ){
            $scope.selected = parent;
        }else{
            $scope.selected = item;
        }
        
    };

    $scope.isSelected = function (item) {
        var output = false;
        //first level
        if($scope.selected && item.componentNumber === $scope.selected.componentNumber )
            output = true;
        /*
        //2nd level selected display 3rd level
        if($scope.selected && item.itemNumber === $scope.selected.componentNumber )
            output = true;
        */
        
            //RARE 3rd level selected keeps 2nd level displayed
        if($scope.selected && item.componentNumber === $scope.selected.itemNumber )
            output = true;
        
        return output;
    };
},
      template: '\n    <div>\n      <table class="table table-condensed table-hover">\n          <thead>\n            <tr>\n                <th>L1</th>\n                <th>L2</th>\n                <th>level</th>\n                <th>componentNumber</th>\n                <th>itemNumber</th>\n            </tr>\n          </thead>\n          <tbody ng-repeat="l1 in properties.values" >\n            <tr  ng-click="selectToDisplay(l1)">\n                <td><img ng-if="l1.isLeaf === \'0\' && !isSelected(l1)" style="height:20px" ng-click="toggleRow(l1,undefined)" src="/bonita/portal/resource/app/AP/cdn/content/assets/img/icons8-expand-64.png">\n                <img ng-if="l1.isLeaf === \'0\' && isSelected(l1)" style="height:20px"  ng-click="toggleRow(l1,undefined)" src="/bonita/portal/resource/app/AP/cdn/content/assets/img/icons8-expand-64.png"></td>\n                <td></td>\n                <td>{{l1.level}}</td>\n                <td>{{l1.componentNumber}}</td>\n                <td>{{l1.itemNumber}}</td>\n            </tr>\n            <tr ng-if="isSelected(l1)" ng-repeat-start="l2 in l1.componentList"  ng-click="selectToDisplay(l2)" >\n                <td></td>\n                <!--<td><a ng-if="l2.isLeaf === \'0\'" ng-click="toggleRow(l2,l1)" href="">++</a></td>-->\n                <td><img ng-if="l2.isLeaf === \'0\' && !isSelected(l2)" style="height:20px" ng-click="toggleRow(l2,l1)" src="/bonita/portal/resource/app/AP/cdn/content/assets/img/icons8-expand-64.png">\n                <img ng-if="l2.isLeaf === \'0\' && isSelected(l2)" style="height:20px"  ng-click="toggleRow(l2,l1)" src="/bonita/portal/resource/app/AP/cdn/content/assets/img/icons8-expand-64.png"></td>\n                <td>{{l2.level}}</td>\n                <td>{{l2.componentNumber}}</td>\n                <td>{{l2.itemNumber}}</td>\n            </tr>\n            <tr ng-repeat-end ng-if="isSelected(l2)"  ng-repeat="l3 in l2.componentList" ng-click="selectToDisplay(l3)" >\n                <td></td>\n                <td></td>\n                <td>{{l3.level}}</td>\n                <td>{{l3.componentNumber}}</td>\n                <td>{{l3.itemNumber}}</td>\n            </tr>\n          </tbody>\n      </table>\n    </div>'
    };
  });
