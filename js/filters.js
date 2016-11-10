remotingApp.filter('casesFilter', function() {
    return function(data, scope) {
        if(data === undefined) return true;
        var casesToReturn = [];

        angular.forEach(data, function(thisData) {
            var filterCaseType = '';
            var sfdcCaseType = '';

            if(scope.caseType != '' && scope.caseType != undefined) filterCaseType = scope.caseType.toLowerCase();
            if(thisData.IsClosed == null || thisData.IsClosed == false || thisData.IsClosed == 'false') {
                sfdcCaseType = 'open';
            } else {
                sfdcCaseType = 'closed';
            }

            if((filterCaseType == '' || filterCaseType == 'all cases') || (filterCaseType == sfdcCaseType)) {
                casesToReturn.push(thisData);
            } 
        });

        return casesToReturn;
    }
});

remotingApp.filter('claimsFilter', function() {
    return function(data, scope) {
        if(data === undefined) return true;
        var claimsToReturn = [];
        
        angular.forEach(data, function(thisData) {
            var filterClaimType = '';
            var filterMemberType = '';
            var sfdcClaimType = '';
            var sfdcMemberType = '';

            // Lowercase all variables
            if(scope.claim.type != '' && scope.claim.type != undefined) filterClaimType = scope.claim.type.toLowerCase();
            if(scope.claim.memberType != '' && scope.claim.memberType != undefined) filterMemberType = scope.claim.memberType.toLowerCase();
            if(thisData.Claim_Type__c != '' && thisData.Claim_Type__c != undefined) sfdcClaimType = thisData.Claim_Type__c.toLowerCase();
            if(thisData.Claim_Member_Type__c != '' && thisData.Claim_Member_Type__c != undefined) sfdcMemberType = thisData.Claim_Member_Type__c.toLowerCase();

            if(filterMemberType == 'dependents') filterMemberType = 'dependent'; // Change dependents from plural to singular

            if(((filterClaimType == '' || filterClaimType == 'all types') || sfdcClaimType === filterClaimType) &&
                ((filterMemberType == '' || filterMemberType == 'all members') || sfdcMemberType == filterMemberType) && (scope.claim.date == undefined || scope.claim.date < thisData.Claim_Date_of_Service__c)) {
                claimsToReturn.push(thisData);
            } 
        });

        return claimsToReturn;
    }
});

remotingApp.filter('drugsFilter', function() {
    return function(data, scope) {
        if(data === undefined) return true;
        var drugsToReturn = [];
        
        angular.forEach(data, function(thisData) {
            var filterDrugType = '';
            var sfdcRecordSaved = false;
            var sfdcRecordPurchased = false;

            if(scope.drugType != '' && scope.drugType != undefined) filterDrugType = scope.drugType.toLowerCase();
            if(thisData.MemberFormulary_Source__c == 'Prescription Search') sfdcRecordSaved = true;
            if(thisData.MemberFormulary_Purchased__c) sfdcRecordPurchased = true;

            if(((filterDrugType == '' || filterDrugType == undefined || filterDrugType == 'purchased') && sfdcRecordPurchased) || (filterDrugType == 'saved' && sfdcRecordSaved)) {
                drugsToReturn.push(thisData);
            } 
        });

        return drugsToReturn;
    }
});

remotingApp.filter('providersFilter', function() {
    return function(data, scope) {
        if(data === undefined) return true;
        var providersToReturn = [];

        angular.forEach(data, function(thisData) {
            var filterProviderType = '';
            var sfdcRecordVisited = false;
            var sfdcRecordViewed = false;

            if(scope.providerType != '' && scope.providerType != undefined) filterProviderType = scope.providerType.toLowerCase();
            if(thisData.Visited__c) sfdcRecordVisited = true;
            if(thisData.Source__c != undefined && thisData.Source__c.toLowerCase() == 'provider search') sfdcRecordViewed = true;

            if(((filterProviderType == '' || filterProviderType == undefined || filterProviderType == 'visited') && sfdcRecordVisited) || (filterProviderType == 'viewed' && sfdcRecordViewed)) {
                providersToReturn.push(thisData);
            } 
        });

        return providersToReturn;
    }
});

remotingApp.filter('tasksFilter', function() {
    return function(data, scope) {
        if(data === undefined) return true;
        var tasksToReturn = [];

        angular.forEach(data, function(thisData) {
            var filterTaskType = '';
            var sfdcTaskType = '';

            if(scope.taskType != '' && scope.taskType != undefined) filterTaskType = scope.taskType.toLowerCase();
            if(thisData.IsClosed == null || thisData.IsClosed == false || thisData.IsClosed == 'false') {
                sfdcTaskType = 'open';
            } else {
                sfdcTaskType = 'closed';
            }

            if((filterTaskType == '' || filterTaskType == 'all tasks') || (filterTaskType == sfdcTaskType)) {
                tasksToReturn.push(thisData);
            }
        });

        return tasksToReturn;
    } 
});