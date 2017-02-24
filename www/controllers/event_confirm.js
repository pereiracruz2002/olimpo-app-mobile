App.controller('EventConfirm', function($scope, $rootScope, $stateParams, $timeout, EventsService, $ionicLoading, $ionicModal, PagamentoService) {
    var valor_pessoa = 0;
    $scope.myModel = {
        'step': 1
    }
    $scope.evento = {
        total_invites: 0,
        price: '0,00'
    };
    $scope.invite_limits = [1];
    $scope.formData = {
        'token': localStorage.getItem('token'),
        'qty': '0',
        'acompanhantes': {}
    };

    EventsService.getInfo($stateParams.event_id).then(function(result){
        $scope.evento = result.data;
        $scope.invite_limits = [1];
        for(var i = 2; i <= $scope.evento.total_invites; i++){
            $scope.invite_limits.push(i);
        }

        valor_pessoa = parseFloat($scope.evento.price);
        $scope.valor_total = number_format(valor_pessoa, 2, ',', '.');
            $scope.formData.event_id = result.data.event_id;

        $ionicLoading.hide()
    });


    $scope.sucesso_msg = '';
    $scope.loading = true;
    var installments = {};
    

    $scope.$watch('formData.qty', function(){
        $scope.valor_total = number_format((valor_pessoa * (parseInt($scope.formData.qty) +1)), 2, ',', '.');
        
        for(var i = 1; i <= parseInt($scope.formData.qty); i++){
            $scope.formData.acompanhantes[i] = {name: '', lastname: ''};
        }

    });

    $scope.confirmarReserva = function(){
        if($scope.formData.qty != '0'){
            $scope.myModel.step = 2;
        } else {
            $scope.efetuarPagamento();
        }
    }

    $scope.efetuarPagamento = function()
    {
        $ionicLoading.show();
        PagamentoService.pagamento($scope.formData).then(function(result){
            if(result.data.paymentLink){
                window.open(result.data.paymentLink, '_system');
                $timeout(function(){
                    $ionicLoading.hide();
                }, 500);
            } else {
                $ionicPopup.alert({
                    'template': result.data.erro
                });
                $ionicLoading.hide();
            }
        });
    }

});

