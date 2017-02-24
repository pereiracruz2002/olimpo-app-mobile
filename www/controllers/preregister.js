App.controller('preRegisterCtrl', function($scope, $stateParams, $ionicPopup, UserService, $ionicLoading, $state, $ionicHistory) {
    $scope.formData = {};
    $scope.preRegister = function() {
        $ionicLoading.show();
        UserService.checkRegisterCode($scope.formData).then(function(result){
            console.log(result.data.status)
            $ionicLoading.hide();
            if(result.data.status == 'success'){
                $state.go('register', {'email': result.data.invite.email, 'code': result.data.invite.code});
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Atenção!',
                    template: result.data.msg,
                    buttons:[{
                        text: 'OK',
                        type: 'button-assertive'
                    }]

                });
            }
        });
    };

})
