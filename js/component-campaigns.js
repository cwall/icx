var campaignApp = angular.module("campaignsComponent", []); 
campaignApp.controller("campaignsCtrl", ["$scope", function($scope) {
    $scope.campaignsList = [];
    
    $scope.getCampaigns = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetCampaigns, 
            objId, objType,
            function(result, event) {
                $scope.campaignsList = result;
                $scope.$apply();
            }); 
    }
}]);