remotingApp.factory('taskService', ['$q', '$rootScope', function($q, $rootScope) {
    return {
    	getTasks: function() {
	        var deferred = $q.defer();

	        Visualforce.remoting.Manager.invokeAction(
	            remoteActionGetTasks,
	            objId, objType,
	            function(result, event) {
	                $rootScope.$apply(function() {
	                  if (event.status) {
	                    deferred.resolve(result);
	                  } else {
	                    deferred.reject(event);
	                  }
	                })
	            },
	            { buffer: true, escape: true, timeout: 30000 }
	        );

	        return deferred.promise;
    	}	
    };
}]);