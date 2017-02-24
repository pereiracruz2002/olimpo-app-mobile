App.controller('EventCategorylCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,UserService) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    $scope.lista_eventos = []; 
    $scope.loading = true;

    UserService.getCategoriesByEvents(localStorage.getItem('token')).then(function(dados){
        $scope.loading = false;
        angular.forEach(dados.data, function(value, key){
            $scope.lista_eventos.push(value);
        });
        if(dados.data.length > 0){
            $timeout(function(){
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .list-category'
                });
            }, 100);
        }
    });
});
