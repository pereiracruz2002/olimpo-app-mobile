App.controller('EventDetail', function($ionicTabsDelegate,$scope,$ionicModal, $rootScope, $stateParams, EventsService, $ionicLoading,$ionicPopup,UserService, $ionicHistory, $ionicSlideBoxDelegate, $timeout) {
    $scope.myModel= {'tab': 1};
    $scope.abaConvite = 1;
    $ionicLoading.show();
    $rootScope.evento = {
        price: '0'
    };

    $scope.platform = ionic.Platform.platform();

    $scope.voltar = function(){
        $ionicHistory.goBack(-1);
    }

    

    EventsService.getInfo($stateParams.event_id).then(function(result){
        $rootScope.evento = result.data;
        $ionicLoading.hide();
        $timeout(function(){
            $ionicSlideBoxDelegate.update();
        }, 1000);
    });

    EventsService.isConfirmed($stateParams.event_id).then(function(result){
        $scope.is_confirmed = result.data.status;
    });


    $scope.isObjectEmpty = function(obj){
        if(obj){
            return (Object.keys(obj).length > 0 ? false : true);
        } else {
            return true;
        }
    }

    $scope.openMap = function(evento){
        if(ionic.Platform.platform() == 'android'){
            window.open("geo:lat,lon?q="+evento.latitude+","+evento.longitude, '_system');
        } else {
            window.open("maps:q="+evento.latitude+","+evento.longitude, '_system');
        }
    }
});
