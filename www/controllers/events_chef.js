App.controller('EventsChef', function($scope,$rootScope, UserService, $ionicLoading){
	$scope.platform = ionic.Platform.platform();
    $ionicLoading.show();
    UserService.getEventsInvited(localStorage.getItem('token')).then(function(result){
        $scope.eventos = result.data;
        $ionicLoading.hide();
    });
});
