App.controller('ConfiguracoesContrller', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, UserService){
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.notificacoes = {};
    UserService.getNotificacoes().then(function(result){
        $scope.notificacoes = result.data;
    });
    $scope.setNotificacoes = function(key)
    {
        UserService.setNotificacoes({'key': key, 'value': $scope.notificacoes[key]});
    }
})
