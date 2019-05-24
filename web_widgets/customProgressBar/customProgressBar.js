(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customProgressBar', function() {
    return {
      controllerAs: 'ctrl',
      controller: function($scope){
    var format = "YYYY-MM-DD HH:mm:ss";
    var values ={};
    initialized = false;
    $scope.isInitialized= function(){
        return initialized;
    }
    
    
    $scope.isExecuted = function (){
        return $scope.properties.value.archivedDate && $scope.properties.value.archivedDate !== "";
    }
    $scope.isAssigned = function (){
        return $scope.properties.value.assigned_date && $scope.properties.value.assigned_date !== "";
    }
    
    $scope.getSize= function (item){
        return values[item];
    }
    
    $scope.$watch('$scope.properties.value',function(){
        initialized = false;
        init();
        
    })
    function init(){
        values ={};
        var ready  = $scope.properties.value.reached_state_date;
        var assigned = $scope.properties.value.assigned_date;
        var archived = $scope.properties.value.archivedDate;
        
        //Executed
        if(archived && archived!==""){
            var wait = moment(assigned,format).diff(moment(ready,format));
            var exec = moment(archived,format).diff(moment(assigned,format));
            var total = moment(archived,format).diff(moment(ready,format));
         
            values.wait = (wait/total)*100;
            values.exec = (exec/total)*100;
            values.total = Math.floor(moment.duration(total).asHours()) + moment.utc(total).format(":mm:ss");
            
        }else{
            //Assigned
            if(assigned && assigned!==""){
                var wait = moment(assigned,format).diff(moment(ready,format));
                var exec = moment().diff(moment(assigned,format));
                var total = moment().diff(moment(ready,format));
                values.wait = (wait/total)*100;
                values.exec = (exec/total)*100;
                values.total = Math.floor(moment.duration(total).asHours()) + moment.utc(total).format(":mm:ss");
                
            
            }else{
                //Nothing
                var total = moment().diff(moment(ready,format));
                values.unas = 100
                values.total = Math.floor(moment.duration(total).asHours()) + moment.utc(total).format(":mm:ss");
         
            }
        }
        initialized = true;
    }
    
}
,
      template: '<div class="progress" ng-if="isInitialized()">\n  <div ng-if="isAssigned()" class="progress-bar progress-bar-info" style="width: {{getSize(\'wait\')}}%">\n    <span class="sr-only">Waiting (warning)</span>\n  </div>\n  <div ng-if="isAssigned() && isExecuted()" class="progress-bar progress-bar-success" style="width: {{getSize(\'exec\')}}%">\n    <span class="sr-only">On Execution</span>\n  </div>\n  <div ng-if="!isAssigned()" class="progress-bar progress-bar-warning progress-bar-striped" style="width: {{getSize(\'unas\')}}%">\n    <span class="sr-only">Not yet Assigned</span>\n  </div>\n  <div ng-if="isAssigned() && !isExecuted()" class="progress-bar progress-bar-danger progress-bar-striped" style="width: {{getSize(\'exec\')}}%">\n    <span class="sr-only">Not yet Assigned</span>\n  </div>\n</div>\n<p>Total Hours:{{getSize(\'total\')}}</p>\n'
    };
  });
