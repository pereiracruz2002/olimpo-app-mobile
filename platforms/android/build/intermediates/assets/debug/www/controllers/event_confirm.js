App.controller('EventConfirmCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,EventsService, $ionicLoading, $ionicModal, angularLoad, PagamentoService, STC_PAGSEGURO, $ionicPopup) {
    var vm = this;
    EventsService.isConfirmed($stateParams.event_id).then(function(result){
        var fabElm = document.getElementById('fab-event_detail');
        $scope.isConfirmed = result.data.status;
        if(result.data.status == false){
            $timeout(function () {
                fabElm.classList.add('button-fab');
                fabElm.classList.toggle('on');
            }, 500);
        } else {
            $timeout(function () {
                fabElm.classList.remove('button-energized-900');
                fabElm.classList.add('button-balanced');
            }, 500);
        }
    });

    $scope.sucesso_msg = '';
    $scope.loading = true;
    var installments = {};
    vm.valor_pessoa = 0;
    
    $scope.session_id = '';
    $scope.formData = {
        'token': localStorage.getItem('token'),
        'pagamento': 'creditCard',
        'qty': '1',
    };
    vm.step = 1;
    vm.invite_limits = [1];
    $rootScope.$watch('evento.total_invites', function(){
        vm.invite_limits = [1];
        for(var i = 2; i <= $rootScope.evento.total_invites; i++){
            vm.invite_limits.push(i);
        }
        vm.valor_pessoa = parseFloat($rootScope.evento.price.replace('.','').replace(',','.'));
        vm.valor_total = number_format((vm.valor_pessoa * parseInt($scope.formData.qty)), 2, ',', '.');
        $scope.formData.event_id = $rootScope.evento.event_id;
    });

    $scope.$watch('formData.qty', function(){
        vm.valor_total = number_format((vm.valor_pessoa * parseInt($scope.formData.qty)), 2, ',', '.');
    });

    $scope.page = {'title': 'Forma de Pagamento'};
    $scope.session_id = '';

    $scope.validarCupom = function()
    {
        PagamentoService.validarCupom($scope.formData).then(function(result){
            if(result.data.status == 'error'){
                $ionicPopup.alert({title: result.data.msg});
            } else {
                var cupom_data = result.data.cupom;
                if(cupom_data.cupom_type == 'percent'){
                    vm.valor_pessoa = vm.valor_pessoa - (vm.valor_pessoa * (cupom_data.value / 100));
                } else {
                    var sub_total_pessoa= vm.valor_pessoa - cupom_data.value;
                    vm.valor_pessoa = (sub_total_pessoa < 0 ? 0 : sub_total_pessoa);
                }
                vm.valor_total = number_format((vm.valor_pessoa * parseInt($scope.formData.qty)), 2, ',', '.');
            }
        });
    }

    $scope.completarCep = function()
    {
        if($scope.formData.cep.length == 9){
            $ionicLoading.show();
            PagamentoService.getEndereco($scope.formData.cep).then(function(result){
                $scope.formData.bairro = result.data.bairro;
                $scope.formData.estado = result.data.uf;
                $scope.formData.cidade = result.data.localidade;
                $scope.formData.endereco = result.data.logradouro;
                $ionicLoading.hide();
            });
        }
    }

    $scope.confirmPresensa = function(){
        if($scope.isConfirmed == false){
            $scope.modal.show();
        }
    }
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    angularLoad.loadScript(STC_PAGSEGURO+'/pagseguro/api/v2/checkout/pagseguro.directpayment.js').then(function() {
        $scope.loading = false;

        PagamentoService.getDirectSession().then(function(result){
            $scope.session_id = result.data;
            PagSeguroDirectPayment.setSessionId(result.data);
        });

        //Cartão de crédito
        var date_now = new Date();
        $scope.creditCard = {
            'cardNumber': '', 
            'cvv': '',
            'expires': new Date(date_now.getFullYear()+5, 0),
            'installmentQuantity': 1,
            'HolderName': '',
            'HolderCPF': '',
            'HolderBirthDate': new Date(),
            'HolderAreaCode': '',
            'HolderPhone': '',
            'installments': [{'qty': 1,  'description': '1x de R$'+number_format(vm.valor_total.replace('.','').replace(',','.'), 2, ',','.')+' (Sem juros)'}]
        };
        var parcelas = [{1: $rootScope.evento.price}];
        $scope.cardNumber = '';
        $scope.cvv_max = 4;
        $scope.hasCvv=true;
        $scope.brand = '';
        $scope.$watch('session_id', function(){
            PagSeguroDirectPayment.getInstallments({
                amount: $rootScope.evento.price,
                brand: $scope.brand,
                success: function(response) 
                {
                    installments = response.installments;
                },
                error: function(response) {
                    installments = {};
                }
            });
        });
        $scope.$watch('creditCard.cardNumber', function()
        {
            if($scope.creditCard.cardNumber){
                $scope.creditCard.cardNumber = $scope.creditCard.cardNumber.replace(/[^0-9]+/g, '');
            }

            if($scope.creditCard.cardNumber && $scope.creditCard.cardNumber.length > 5){
                PagSeguroDirectPayment.getBrand({
                    cardBin: $scope.creditCard.cardNumber,
                    success: function(response){
                        $scope.brand = response.brand.name;
                        $scope.cvv_max = response.brand.cvvSize;
                        $scope.hasCvv = response.brand.config.hasCvv;
                        if(response.brand.config.hasDueDate)
                            document.getElementById('validade').setAttribute('required', 'required')
                        else
                            document.getElementById('validade').removeAttribute('required')
                    },
                    error: function(response){
                        $scope.brand = '';
                        document.getElementById('validade').removeAttribute('required')
                    }
                });
            }
            if($scope.creditCard.cardNumber && $scope.creditCard.cardNumber.length < 6){
                $scope.brand = '';
                document.getElementById('validade').removeAttribute('required')
            }
        });

    $scope.$watch('brand', function()
    {
        if(typeof $scope.brand == "undefined" || $scope.brand == ""){
            $scope.creditCard.installments = [{'qty': 1,  'description': '1x de R$'+number_format(vm.valor_total.replace('.','').replace(',','.'), 2, ',','.')+' (Sem juros)'}];
            parcelas = [{1: $rootScope.evento.price}];
        } else {
            $scope.creditCard.installments = [];
            angular.forEach(installments[$scope.brand], function(val, key){
                parcelas[val.quantity] = val.installmentAmount;
                $scope.creditCard.installments.push({'qty': val.quantity, 'description': val.quantity+'x de R$'+number_format(val.installmentAmount, 2, ',','.')+' ('+(val.interestFree ? 'Sem juros' : 'Com juros')+')'});
            });

        }
    });

    $scope.finalizarCompra = function()
    {
        $scope.erro_msg = '';
        $scope.loading = true;
        $scope.cancelada = false;
        $scope.formData.pagseguroHash = PagSeguroDirectPayment.getSenderHash();

        if($scope.formData.pagamento == 'creditCard'){
            $scope.formData.installmentQuantity = parseInt($scope.creditCard.installmentQuantity);
            $scope.formData.installmentValue= parcelas[$scope.formData.installmentQuantity];
            $scope.formData.creditCardHolderName = $scope.creditCard.HolderName;
            $scope.formData.creditCardHolderCPF = $scope.creditCard.HolderCPF;
            $scope.formData.creditCardHolderBirthDate = $scope.creditCard.HolderBirthDate;
            $scope.formData.creditCardHolderAreaCode = $scope.creditCard.HolderAreaCode;
            $scope.formData.creditCardHolderPhone = $scope.creditCard.HolderPhone;


            PagSeguroDirectPayment.createCardToken({
                cardNumber: $scope.creditCard.cardNumber,
                brand: $scope.brand,
                cvv: $scope.creditCard.cvv,
                expirationMonth: $scope.creditCard.expires.getMonth() +1,
                expirationYear: $scope.creditCard.expires.getFullYear(),
                success: function(response){
                    $scope.formData.creditCardToken = response.card.token;
                    $scope.$apply();
                    ProcessarCompra();
                },
                error: function(response){
                    $scope.erro_msg += '<li>Cartão de Crédito inválido</li>';
                    $scope.loading = false;
                    $scope.$apply();
                },
                complete: function(response){
                }
            });
        }

        if(['boleto', 'semPagar'].indexOf($scope.formData.pagamento) > -1){
            ProcessarCompra();
        }
    }

    function ProcessarCompra() {
        $scope.formData.event_id = $rootScope.evento.event_id;
        PagamentoService.pagamento($scope.formData).then(function(result){
            var data = result.data;
            if(data.status == 'erro'){
                alert(data.msg) 
                $scope.loading = false;
            } else {
                if(data.redirect){
                    var isOpenLightbox = PagSeguroLightbox({
                        code: data.checkoutCode 
                    }, {
                        success : function(transactionCode) {
                            CarrinhoService.getStatusAtual().then(function(result){
                                $scope.sucesso_msg = result.data.html;
                            })
                        },
                        abort : function() {
                            CarrinhoService.cancelarPedidoAtual();
                            $scope.erro_msg = 'Você não finalizou sua compra';
                            $scope.loading = false;
                        }
                    });
                    if (!isOpenLightbox) {
                        window.location.href = data.redirect
                    }
                }

                if(data.erro){
                  $scope.erro_msg = data.erro
                  $scope.loading = false;
              } else {
                if($scope.formData.pagamento == 'creditCard'){
                    $scope.sucesso_msg = 'Seu pagamento está: '+data.payment.status;
                    $scope.loading = false;
                } else {
                    $scope.loading = false;
                    $scope.sucesso_msg = '<a href="'+data.payment.boleto_download+'" target="_system">Abrir Boleto</a>';
                }
            }
        }
    });
    }
    }).catch(function(){
        $scope.erro_msg = 'Erro ao carregar PagSeguro';
    });



    $ionicModal.fromTemplateUrl('views/event_confirm.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

});

