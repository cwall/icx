var remotingApp = angular.module("remotingComponent", ['angularUtils.directives.dirPagination']); 
remotingApp.controller("remotingCtrl", ["$scope", "$filter", function($scope, $filter) {
    // SFDC record lists
    $scope.activePolicyList = [];
    $scope.appealsList = [];
    $scope.attachmentsList = [];
    $scope.billsList = [];
    $scope.campaignsList = [];
    $scope.casesList = [];
    $scope.claimsList = [];
    $scope.drugsList = [];
    $scope.planMembersList = [];
    $scope.policyHistoryList = [];
    $scope.policyHistoryNames = [];
    $scope.policyCoveragesList = [];
    $scope.providersList = [];
    $scope.tasksList = [];

    // Custom claims filter
    $scope.claim = {};
    $scope.claim.type = '';
    $scope.claim.memberType = '';
    $scope.claim.date;

    // Custom providers filter
    $scope.providerType = '';

    // Custom drugs filter
    $scope.drugType = '';

    // Counts
    $scope.drugFilled = 0;
    $scope.drugOnlineActivity = 0;
    $scope.openCases = 0;
    $scope.openTasks = 0;
    $scope.providerOnlineActivity = 0;
    $scope.providerVisited = 0;

    $scope.billsYTD = 0;
    $scope.claimsYTD = 0;
    $scope.totalProviders = 0;
    $scope.totalRx = 0;

    // Service request filters
    $scope.caseType = 'Open';
    $scope.taskType = 'Open';

    
    $scope.getAppeals = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetAppeals, 
            objId, objType,
            function(result, event) {
                $scope.appealsList = result;
                $scope.$apply();
            }); 
    }

    $scope.getAttachments = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetAttachments, 
            objId, objType,
            function(result, event) {
                $scope.attachmentsList = result;
                $scope.$apply();
            });
    }

    $scope.getBills = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetBills, 
            objId, objType,
            function(result, event) {
                $scope.billsList = result;
                $scope.$apply();
                var firstOfYear = getFirstOfYear();

                if(result == null || result == undefined) {
                    $scope.billsYTD = 0;
                    return;
                }

                j$.each(result, function(key, value) {
                    if(result[key].Invoice_Date__c > firstOfYear) {
                        $scope.billsYTD++;
                    }
                });

            }); 
    }

    $scope.getCampaigns = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetCampaigns, 
            objId, objType,
            function(result, event) {
                $scope.campaignsList = result;
                $scope.$apply();
            }); 
    }

    $scope.getCases = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetCases,
            objId, objType,
            function(result, event) {
                $scope.casesList = result;
                $scope.$apply();

                if(result == null || result == undefined) {
                    $scope.openCases = 0;
                    return null;
                }

                j$.each(result, function(key, value) {
                    if(!result[key].IsClosed) {
                        $scope.openCases++;
                    }
                });
            });
    }

    $scope.getClaims = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetClaims,
            objId, objType,
            function(result, event) {
                $scope.claimsList = result;
                $scope.$apply();
                var firstOfYear = getFirstOfYear();

                if(result == null || result == undefined) {
                    $scope.claimsYTD = 0;
                    return;
                }

                j$.each(result, function(key, value) {
                    if(result[key].CreatedDate > firstOfYear) {
                        $scope.claimsYTD++;
                    }
                });
            });
    }

    $scope.getDrugs = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetDrugs,
            objId, objType,
            function(result, event) {
                $scope.drugsList = result;
                $scope.$apply();
                var drugsArray = [];
                var totalDrugsArray = [];

                if(result == null || result == undefined) {
                    $scope.totalRx = 0;
                    return;
                }

                j$.each(result, function(key, value) {
                    drugsArray.push(result[key].MemberFormulary_Drug__c);

                    if(result[key].MemberFormulary_Saved_Drug__c) {
                        $scope.drugOnlineActivity++;
                    }

                    if(result[key].MemberFormulary_Purchased__c) {
                        $scope.drugFilled++;
                    }
                });

                totalDrugsArray = dedupeArray(drugsArray);
                $scope.totalRx = totalDrugsArray.length;
            });
    }

    $scope.getPlanMembers = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetPlanMembers, 
            objId, objType,
            function(result, event) {
                $scope.planMembersList = result;
                $scope.$apply();
            }); 
    }

    $scope.getPolicies = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetPolicies,
            objId, objType,
            function(result, event) {
                $scope.$apply();
                var policiesArray = [];

                j$.each(result, function(key, value) {
                    if(result[key].MemberCoverage_Member_Coverage_Status__c.toLowerCase() === 'active') {
                        $scope.activePolicyList.push(result[key]);
                    } else {
                        $scope.policyHistoryList.push(result[key]);
                        policiesArray.push({id: result[key].MemberCoverage_Policy_Coverage__r.PolicyCoverage_Policy__c, name: result[key].MemberCoverage_Policy_Coverage__r.PolicyCoverage_Policy__r.Name});
                    }
                });

                var arr = {};
                for (var i = 0, len = policiesArray.length; i < len; i++ ) {
                    arr[policiesArray[i]['id']] = policiesArray[i];
                }

                policiesArray = new Array();
                for ( var key in arr ) {
                    policiesArray.push(arr[key]);
                }


                $scope.policyHistoryNames = policiesArray;
            });
    }

    $scope.getPolicyCoverages = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetPolicyCoverages,
            objId, objType,
            function(result, event) {
                $scope.policyCoveragesList = result;
                $scope.$apply();
            });
    }

    $scope.getProviders = function() {
            Visualforce.remoting.Manager.invokeAction(
            remoteActionGetProviders,
            objId, objType,
            function(result, event) {
                $scope.providersList = result;
                $scope.$apply();
                var providersArray = [];
                var totalProvidersArray = [];

                j$.each(result, function(key, value) {
                    providersArray.push(result[key].Provider__c);

                    if(result[key].Visited__c) {
                        $scope.providerVisited++;
                    }

                    if(result[key].Source__c != undefined && result[key].Source__c != null && result[key].Source__c != '' && result[key].Source__c.toLowerCase() == 'provider search') {
                        $scope.providerOnlineActivity++;
                    }
                });

                totalProvidersArray = dedupeArray(providersArray); 
                $scope.totalProviders = totalProvidersArray.length; 
            }); 
    }

    $scope.getServiceRequests = function() {
        $scope.casesList = $scope.getCases();
        $scope.tasksList = $scope.getTasks();
    }

    $scope.getTasks = function() {
        Visualforce.remoting.Manager.invokeAction(
            remoteActionGetTasks,
            objId, objType,
            function(result, event) {
                $scope.tasksList = result;
                $scope.$apply();

                j$.each(result, function(key, value) {
                    if(!result[key].IsClosed) {
                        $scope.openTasks++;
                    }
                });
            });
    }

    function getFirstOfYear() {
        return new Date(new Date().getFullYear(), 0, 1);
    }

    function dedupeArray(arr) {
        if(arr === undefined) return;
        
        var dedupedArray = {};
        return arr.filter(function(item) {
            return dedupedArray.hasOwnProperty(item) ? false : (dedupedArray[item] = true);
        });
    }
}]);