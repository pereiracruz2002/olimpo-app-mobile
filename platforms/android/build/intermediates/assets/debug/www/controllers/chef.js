App.controller('RegisterChefCtrl', function($scope, $timeout, ionicMaterialInk, $ionicPopup, UserService, $ionicLoading, $ionicModal) {
    $scope.formData = {};
    $timeout(function () {
        document.getElementById('fab-event').classList.toggle('on');
    }, 500);

    $ionicModal.fromTemplateUrl('views/registerChef.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $ionicLoading.show({
            template: '<strong class="balanced-900 bold balanced-100-bg"><div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /></svg></div></strong>'
        });

       


        UserService.canRequestChef().then(function(result){
            $ionicLoading.hide();
            if(result.data.status == 'yes'){
                $scope.modal.show();
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Atenção!',
                    template: result.data.msg 
                });
            }
        })

    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    UserService.getCategories().then(function(result){
        $scope.categorias = result.data;
    });

    $scope.requestChef = function()
    {
        UserService.requestChef($scope.formData).then(function(result){
            if(result.data.status == 'success'){
                $scope.modal.hide();
                var popupTitle = 'Parabéns!';
            } else {
                var popupTitle = 'Atenção!';
            }

            var alertPopup = $ionicPopup.alert({
                title: popupTitle,
                template: result.data.msg
            });

        });
    }

});
