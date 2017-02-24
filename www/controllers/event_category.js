App.controller('EventCategorylCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,UserService) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    $scope.lista_eventos = {
        'par': []
    }
    $scope.loading = true;

    console.log(localStorage.getItem('token'));

    UserService.getCategoriesByEvents(localStorage.getItem('token')).then(function(dados){
        $scope.loading = false;
        angular.forEach(dados.data, function(value, key){
            $scope.lista_eventos.par.push(value);
        });
        if(dados.data.length > 0){
            $timeout(function(){
                $scope.loading = false;
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 100);
        }
    });
});
