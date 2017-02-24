App.controller('EditarCtrl', function(URL_API,$cordovaCamera,$cordovaFileTransfer,$scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,UserService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $rootScope.navMenu = true;
    $scope.eventos = [];
    $scope.loading = true;
    $scope.user = "";

    UserService.getInfo().then(function(retorno){

        $scope.user = retorno.data;

        console.log($scope.user);

    });

    $scope.selecionaFoto = function(){

           var options = {
                quality: 50, 
                destinationType: Camera.DestinationType.FILE_URI, 
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY, 
                encodingType: Camera.EncodingType.JPEG, 
                correctOrientation: true, 
                allowEdit: true
            }

            $cordovaCamera.getPicture(options).then(function(imageData) {

                console.log(imageData);
                
                var options = {
                    fileKey: "photo",
                    fileName: "image.jpg",
                    chunkedMode: false,
                    mimeType: "image/"
                };


                var urlServidorFoto = URL_API+"foto/upload";

                console.log(urlServidorFoto);

                $cordovaFileTransfer.upload(urlServidorFoto, imageData, options).then(function(retorno){
                    console.log(retorno);

                    var respostaParseada = JSON.parse(retorno.response);

                    var dadosImagem = respostaParseada.upload_data;

                    var imagem = dadosImagem.file_name;

                    UserService.updatePicture(imagem).then(function(retorno){

                        //console.log(retorno.data.imagem);

                        $("#fotoperfil").attr('src',retorno.data.imagem);

                    });

                    

                });

            }, function(err) {
              // error
            });

    }
    

});

