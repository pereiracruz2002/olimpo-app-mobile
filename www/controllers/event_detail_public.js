App.controller('EventDetailPublic', function($scope, $rootScope, $timeout,$stateParams, EventsService,$ionicLoading){
	$ionicLoading.show();
	EventsService.getEventDetailPublic($stateParams.event_id).then(function(result){
        $scope.evento = result.data;
        $scope.name = result.data.name;
        $scope.local  = result.data.city;
        $ionicLoading.hide();
    })
});
