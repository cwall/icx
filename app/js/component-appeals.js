var appealApp = angular.module("appealsComponent", []); 
appealApp.controller("appealsCtrl", ["$scope", function($scope) {
    $scope.appealsList = [];
    
    $scope.getAppeals = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetAppeals, 
            objId, objType,
            function(result, event) {
                $scope.appealsList = result;
                $scope.$apply();
            }); 
    }
}]);