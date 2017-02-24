App.controller('EventsCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,UserService) {
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
        'impar': [],
        'par': []
    }
    $scope.loading = true;

    console.log(localStorage.getItem('token'));

    UserService.getEvents(localStorage.getItem('token'),$stateParams.event_type_id).then(function(dados){
        $scope.loading = false;
        angular.forEach(dados.data, function(value, key){
            if(key % 2 === 0){
                $scope.lista_eventos.par.push(value);
            } else {
                $scope.lista_eventos.impar.push(value);
            }
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
