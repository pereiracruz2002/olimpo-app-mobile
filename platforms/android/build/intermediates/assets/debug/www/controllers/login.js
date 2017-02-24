App.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicPopup, UserService, $ionicLoading, $state, $ionicHistory) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();

        if(localStorage.getItem('token')){
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.event_category');
        }
    }, 0);
    ionicMaterialInk.displayEffect();

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
                $state.go('app.event_category');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Atenção!',
                    template: result.data.msg
                });
            }
        });
    }

    $scope.facebookLogin = function () {
        $ionicLoading.show();

        facebookConnectPlugin.login(['email'], function (data) {
            UserService.fbLogin(data.authResponse.accessToken).then(function(result){
                $ionicLoading.hide();
                if(result.data.status == 'success'){
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    localStorage.setItem('token', result.data.token);
                    
                    window.plugins.OneSignal.getIds(function(ids) {
                      UserService.updatePushNotification(ids.userId,ids.pushToken);
                  });

                    $state.go('app.profile');
                } else {
                    $ionicPopup.alert({
                     title: 'Atenção:',
                     template: result.data.msg 
                 });

                }
            });
        }, function (data) {
            $ionicLoading.hide();
            $ionicPopup.alert({
             title: 'Atenção:',
             template:  'Não foi possível entrar com seu Facebook'
         });

        });
};

$scope.preRegister = function() {
    $scope.data = {};
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.codigo">',
            title: 'Cadastre-se',
            subTitle: 'Digite seu código de convidado',
            scope: $scope,
            buttons: [
            { 
                text: '<b>Cancelar</b>',
                type: 'button-clear assertive'
            },
            {
                text: '<b>Avançar</b>',
                type: 'button-clear balanced',
                onTap: function(e) {
                    e.preventDefault();
                    if ($scope.data.codigo){ 
                        myPopup.close();
                        $ionicLoading.show();
                        UserService.checkRegisterCode($scope.data).then(function(result){
                            console.log(result.data.status)
                            $ionicLoading.hide();
                            if(result.data.status == 'success'){
                                $state.go('app.register', {'email': result.data.invite.email, 'code': result.data.invite.code});
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atenção!',
                                    template: result.data.msg
                                });
                            }
                        });
                    }
                }
            }
            ]
        });
};
})

