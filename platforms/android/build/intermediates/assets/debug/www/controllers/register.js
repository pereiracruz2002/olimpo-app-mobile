App.controller('RegisterCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, UserService, $ionicPopup, $ionicLoading, $state) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $rootScope.navMenu = false;
    $scope.registar = false;

 



    $scope.formData = {
        'code': $stateParams.code,
        'email': $stateParams.email
    }

    $scope.registar = function()
    {
        $ionicLoading.show({
            template: '<strong class="balanced-900 bold balanced-100-bg"><div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /></svg></div></strong>'
        });

        UserService.register($scope.formData).then(function(result){
            $ionicLoading.hide();
            if(result.data.status == 'success'){
                var alertPopup = $ionicPopup.alert({
                    title: 'Parabéns!',
                    template: result.data.msg
                });
                alertPopup.then(function(res) {
                    $state.go('app.login');
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Atenção!',
                    template: result.data.msg
                });

            }
        });
    }
});
