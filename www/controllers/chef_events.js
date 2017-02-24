App.controller('ChefEvents', function($scope, $rootScope, UserService, $stateParams, $ionicLoading){
    $ionicLoading.show();
    $scope.platform = ionic.Platform.platform();
    $scope.heightImg = '';
    UserService.getEventsByChef($stateParams.user_id).then(function(result){
        $scope.eventos = result.data;
        $scope.chef_name = result.data[0].owner_name;
        $scope.chef_picture = result.data[0].owner_picture;
        $ionicLoading.hide();
    });

    $scope.ajustImgHeight = function()
    {
        $scope.heightImg = document.querySelector('.listItemEventsChef').width;
    }
});
