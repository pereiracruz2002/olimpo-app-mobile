App.controller('EventDetailMapCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,EventsService, $ionicLoading) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.myModel= {'tab': 1};
    $ionicLoading.show({
        template: '<strong class="balanced-900 bold balanced-100-bg"><div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /></svg></div></strong>'
    });
   

    EventsService.getInfo($stateParams.event_id).then(function(result){
        $scope.evento = result.data;
        var latLng = new google.maps.LatLng(result.data.latitude,result.data.longitude);



        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: 'Hello World!'
        });

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        marker = new google.maps.Marker({position: latLng,map: map});
        //$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        $scope.map = map;

       
        $ionicLoading.hide()
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);


        // Activate ink for controller
        ionicMaterialInk.displayEffect();

    })

});
