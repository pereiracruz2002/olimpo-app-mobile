App.controller('searchEventController', function($scope, $state, $ionicLoading, EventsService, UserService, $ionicPopup) {
    $scope.invite_code = {
        token: localStorage.getItem('token'),
        code: ''
    }
    $scope.inscreverEvento = function()
    {
        if($scope.invite_code.code){
            $ionicLoading.show({
                template: '<strong class="balanced-900 bold balanced-100-bg"><div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /></svg></div></strong>'
            });

            UserService.checkRegisterCode({'codigo': $scope.invite_code.code}).then(function(result){
                $ionicLoading.hide();
                if(result.data.status == 'success'){
                    $ionicPopup.confirm({
                        title: 'Evento encontrado com sucesso!',
                        template: 'Você deseja fazer parte de convidados dessa lista?',
                        buttons:[{
                            text: 'Não',
                            type: 'button-default'
                        },
                        {
                            text: 'Sim',
                            type: 'button-primary',
                            onTap: function(){
                                EventsService.addEventGuest($scope.invite_code).then(function(result){
                                    $ionicPopup.alert({
                                        title: result.data.title,
                                        template: result.data.msg
                                    });
                                    $scope.invite_code.code = '';
                                });
                            }
                        }]
                    });
                } else {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: result.data.msg
                    });
                }
            });
        }
    }
});
