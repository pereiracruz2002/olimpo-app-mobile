App.controller('LoginCtrl', function($scope, $stateParams, $ionicPopup, UserService, $ionicLoading, $state, $ionicHistory) {

    $scope.formData = {};

    $scope.loginViaForm = function()
    {
        $ionicLoading.show();

        UserService.login($scope.formData).then(function(result){

            $ionicLoading.hide();
            if(result.data.status == 'success'){
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                localStorage.setItem('token', result.data.token);
                if (window.cordova && window.cordova.plugins.OneSignal) {
                    window.plugins.OneSignal.getIds(function(ids) {
                      console.log('getIds: ' + JSON.stringify(ids));
                      console.log("userId = " + ids.userId + ", pushToken = " + ids.pushToken);

                      UserService.updatePushNotification(ids.userId,ids.pushToken);
                    });
                }
                $state.go('tab.events_chef');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Atenção!',
                    template: result.data.msg,
                    buttons:[{
                        text: 'OK',
                        type: 'button-dark'
                    }]
                });
            }
        });
    }


    $scope.esqueciSenha = function()
    {
        $ionicLoading.show();

        UserService.esqueciSenha($scope.formData).then(function(result){
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


})

