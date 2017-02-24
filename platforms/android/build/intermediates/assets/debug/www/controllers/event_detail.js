App.controller('EventDetailCtrl', function($ionicTabsDelegate,$scope,$ionicModal, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,EventsService, $ionicLoading,$ionicPopup,$cordovaSocialSharing,UserService) {
    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(true);
    $scope.myModel= {'tab': 1};
    $scope.abaConvite = 1;
    $ionicLoading.show({
        template: '<strong class="balanced-900 bold balanced-100-bg"><div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /></svg></div></strong>'
    });
    $rootScope.evento = {
        price: '0',
        event_id: ''
    };

    EventsService.getInfo($stateParams.event_id).then(function(result){
        $rootScope.evento = result.data;
        $ionicLoading.hide()
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

    });

    $scope.selectTabWithIndex = function(index) {
        $ionicTabsDelegate.select(index);
      }


    $scope.changeTabs = function(tab_id)
    {
        $scope.myModel.tab = tab_id;
    }

    
});

