App.controller('ActivityCtrl', function($scope, $timeout, ionicMaterialInk, $ionicPopup, UserService, $ionicLoading, $ionicModal) {
    $scope.notificacoes = [];


    UserService.getNotificationUser().then(function(retorno){
        console.log(retorno.data);
        $scope.notificacoes = retorno.data;
    });






});
