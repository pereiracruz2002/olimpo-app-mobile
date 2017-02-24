App.controller('FriendsCtrl', function($scope, $ionicLoading, UserService, $cordovaSocialSharing, $ionicPopup) {
    $ionicLoading.show();
    var dados = {'token': localStorage.getItem('token')};
    UserService.getFriends(dados).then(function(retorno){
        $scope.friends = retorno.data;
        $ionicLoading.hide();
    });

    $scope.convidar = function(){
        $ionicLoading.show();
        UserService.geraCodigo(dados).then(function(result){
            var message = 'Faça parte da minha rede de amigos no Dinner 4 Friends, baixe agora o aplicativo e se registre com meu código: '+result.data.codigo;
            var subject = 'Convite para participar do D4F';
            var file = '';
            var link = 'https://www.d4f.com.br/download';
            $ionicLoading.hide();
            $cordovaSocialSharing
                .share(message, subject, file, link) // Share via native share sheet
                .then(function(result) {
                    $ionicPopup.alert({
                        'template': 'Convite enviado com sucesso.'
                    })

                }, function(err) {
                    $ionicPopup.alert({
                        'template': 'Você não enviou seu convite.'
                    })
                });
        });
    }

});
