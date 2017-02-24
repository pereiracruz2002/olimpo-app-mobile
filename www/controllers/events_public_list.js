App.controller('EventsPublicList', function($scope, $rootScope, $timeout,$stateParams, EventsService,$ionicLoading){
	$scope.myModel= {'tab': 1};
	$ionicLoading.show();
	EventsService.getListEventsPublic($stateParams.event_id).then(function(result){
        $scope.eventos = result.data;
        $scope.titulo = result.data[0].category;
        $scope.local  = result.data[0].city;
        $ionicLoading.hide();
    })
});
