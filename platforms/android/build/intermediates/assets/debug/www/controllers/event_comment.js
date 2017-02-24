App.controller('EventCommentCtrl', function($scope, $rootScope, $timeout, $ionicPopup, $ionicModal, EventsService, $ionicLoading){
    var fabElm = document.getElementById('fab-event_comment');
    $timeout(function () {
        fabElm.classList.add('button-fab');
        fabElm.classList.toggle('on');
    }, 500);

    $scope.formData = {
        'comment': ''
    }

    $scope.cadastraComentario = function(){
        $ionicLoading.show({
            template: '<strong class="balanced-900 bold balanced-100-bg"><div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /></svg></div></strong>'
        });

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

