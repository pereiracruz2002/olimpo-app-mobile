App.controller('CurriculumCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,EventsService, $ionicLoading, $ionicNavBarDelegate) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $rootScope.navMenu = true;
    $ionicLoading.show();

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var dados = $stateParams.chef_id;
    EventsService.getCurriculum(dados).then(function(retorno){
        $scope.chef = retorno.data[0];
        $ionicLoading.hide();
        $timeout(function(){
            ionicMaterialMotion.fadeSlideInRight({
                selector: '.animate-fade-slide-in .curriculum .item'
            });
        }, 100);
    });
});

