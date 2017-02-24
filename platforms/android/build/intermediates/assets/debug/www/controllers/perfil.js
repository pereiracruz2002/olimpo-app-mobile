App.controller('PerfilCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,UserService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $rootScope.navMenu = true;
    $scope.eventos = [];
    $scope.loading = true;

    if($stateParams.id){
        var dados = {"user_id":$stateParams.id};
    } else {
        var dados = {"user_id":$rootScope.user.user_id};
    }

    $scope.eventos = [];
    var token = localStorage.getItem('token');

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
    
    UserService.getPerfil(dados).then(function(retorno){
        $scope.loading = false;
        $scope.user = retorno.data.usuario;
        $scope.eventos = retorno.data.eventos;
        $scope.amigos = retorno.data.amigos;
    });

});

