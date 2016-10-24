var billingApp = angular.module("billsComponent", []); 
billingApp.controller("billsCtrl", ["$scope", function($scope) {
    $scope.billsList = [];
    
    $scope.getBills = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetBills, 
            objId, objType,
            function(result, event) {
                $scope.billsList = result;
                $scope.$apply();
            }); 
    }
}]);