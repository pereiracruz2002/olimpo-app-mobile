App.controller('EventCommentCtrl', function($scope, $rootScope, $timeout, $ionicPopup, $ionicModal, EventsService, $ionicLoading){

    $scope.formData = {
        'comment': ''
    }

    $scope.cadastraComentario = function(){
        $ionicLoading.show();

        EventsService.insertCommentForEvent($rootScope.evento.event_id, $scope.formData.comment).then(function(retorno){
            if(retorno.data.status == "success"){
                EventsService.getInfo($rootScope.evento.event_id).then(function(result){
                    $rootScope.evento = result.data;
                    $scope.modal.hide();
                });
            }else{
                $ionicPopup.alert({
                    title: "Erro",
                    template: "Não foi possível cadastrar o comentário no momento tente novamente mais tarde"
                });
            }
            $ionicLoading.hide();
        });
    }

    $scope.writeComment = function(){
        $scope.modal.show();
    }

    $scope.countCaracter = function(keyEvent) {
        console.log('aqui na linha 31')
        if (keyEvent.which === 13)
            alert('I am an alert');
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    $ionicModal.fromTemplateUrl('views/event_comment.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
});

