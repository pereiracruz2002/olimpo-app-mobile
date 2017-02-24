App.controller('EventInviteCtrl', function($scope, $rootScope,$stateParams,UserService, $timeout, $ionicPopup, $ionicModal, EventsService, $ionicLoading,$cordovaSocialSharing){
    
     var fabElm = document.getElementById('fab-event_invite');
    $timeout(function () {
        fabElm.classList.add('button-fab');
        fabElm.classList.toggle('on');
    }, 500);


    $scope.convidaAmigos = function(){
        EventsService.checkInviteFriendsForEvent($stateParams.event_id).then(function(retorno){
            if(retorno.data.status == 'success'){
                $scope.amigosParaConvidar = retorno.data.ListagemDeAmigosNaoConvidados;
                $scope.ConvitesDisponiveis = retorno.data.ConvitesDisponiveis;
                $scope.verificaQuantidadeConvite = function(evento){
                    var checkboxs =  document.querySelectorAll("#listAmigos input[type=checkbox]");
                    var formDados = document.querySelector("#formConvites");

                    var quantidade = 0;

                    for(check in checkboxs){
                        if(checkboxs[check].checked == true){
                            quantidade = quantidade + 1;
                        }
                    }

                    if(quantidade > $scope.ConvitesDisponiveis){
                        var alertPopup = $ionicPopup.alert({
                            title: "Atenção",
                            template: "Quantidade de convite excedida"
                        });
                        alertPopup.then(function(res) {
                            console.log('fechou o alert');
                        });
                        evento.target.checked = false;
                    }
                }

                $ionicModal.fromTemplateUrl('views/event_invite.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modal = modal;
                    $scope.closeModal = function() {
                        $scope.modal.hide();
                    };
                    $scope.modal.show();
                });

            } else {
                var alertPopup = $ionicPopup.alert({
                    title: retorno.data.status,
                    template: retorno.data.msg
                });

                alertPopup.then(function(res) {
                    console.log('fechou o alert');
                });
            }
        });

        $scope.enviarConvites = function(){
            var dados = $("#formConvites").serialize();
            var token = localStorage.getItem('token');
            var evento = $stateParams.event_id;

            formfinal = dados+"&token="+token+"&evento="+evento;
            EventsService.insertInvitedInEvent(formfinal).then(function(retorno){
                if(retorno.data.status == "sucesso"){
                    var alertPopup = $ionicPopup.alert({
                     title: "Sucesso",
                     template: "Convites enviados com sucesso"
                 });
                    $scope.modal.hide();
                    alertPopup.then(function(res) {
                        console.log('fechou o alert');
                    });
                } else {
                    var erros = $scope.data.errors;
                    var msg = "Não foi possivel a incrição dos seguintes amigos";

                    for(erro in erros){
                        msg +=","+erros[erro].name;
                    }

                    msg += ", foi esgotada a quantidade de convite possiveis para esse evento";

                    var alertPopup = $ionicPopup.alert({
                        title: "Evento Esgotado",
                        template: "msg"
                    });
                    $scope.modal.hide();

                    alertPopup.then(function(res) {
                        console.log('fechou o alert');
                    });
                }
            });
        }

        $scope.enviarConvitesEmail2 = function(){

            var dados = $("#convidarPorEmail").serialize();
            var token = localStorage.getItem('token');
            var evento = $stateParams.event_id;
            var dadosFinal = dados+"&event_id="+evento+"&token="+token;
            EventsService.invitedEmail(dadosFinal).then(function(retorno){
                if(retorno.data.status == "success"){
                    var alertPopup = $ionicPopup.alert({
                        title: "Sucesso",
                        template: "Convites enviados com sucesso"
                    });

                    $scope.modal.hide();

                    alertPopup.then(function(res) {
                        console.log('fechou o alert');
                    });
                } else {

                    var erros = $scope.data.naoenvidados;

                    var msg = "Não foi possivel a incrição dos seguintes amigos";

                    for(erro in erros){
                        msg +=","+erros[erro].name;
                    }

                    msg += ", foi esgotada a quantidade de convite possiveis para esse evento";

                    var alertPopup = $ionicPopup.alert({
                        title: "Evento Esgotado",
                        template: "msg"
                    });

                    $scope.modal.hide();

                    alertPopup.then(function(res) {
                        console.log('fechou o alert');
                    });
                }
            });
        }

    }


    $scope.mudaAbaConvite = function(aba){
        $scope.abaConvite = aba;
    }

    $scope.conviteMidias =  function(){
        var dados = {"evento":$stateParams.event_id};
        UserService.geraCodigo(dados).then(function(retorno){
            var subject = "Convite Amigo Chefe";
            var message = "Você foi convidado para participar do aplicativo amigo-chef acesse o link http://app.playstore.com.br/amigo-chef faça seu cadastro com o código:"+retorno.data.codigo+"";
            var link = "http://app.playstore.com.br/amigo-chef";
            $cordovaSocialSharing.share(message, subject, null, link).then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
        });
    }
});
