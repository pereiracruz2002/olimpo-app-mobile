App.controller('RegisterCtrl', function($scope, $rootScope, $stateParams, $timeout, UserService, $ionicPopup, $ionicLoading, $state, $q, $cordovaCamera, $ionicPlatform, $cordovaDatePicker) {
    $scope.registar = false;
    $scope.contentBg = '';

    $scope.formData = {
        'code': $stateParams.code,
        'email': $stateParams.email,
        'password': '',
        'password2': '',
        'birthday': ''
    }

    $ionicPlatform.ready(function(){
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
        };

        $scope.choosePicture = function(){
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.formData.picture = "data:image/jpeg;base64," + imageData;
                
            }, function(err) {
                // error
            });
        }

    });

    var birthday = new Date();
    $scope.birthday_display = 'Data de Nascimento';
    $scope.openDatePicker = function(){
        var d = new Date();
        var month= d.getMonth();
        var day = d.getDate();
        if(month < 10)
            month = '0'+(month + 1);

        if(day < 10)
            day = '0'+day;

        if($scope.formData.birthday){
            var data_atual = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate());
        } else {
            var data_atual = new Date();
        }
        var options = {
            date: data_atual,
            mode: 'date', // or 'time'
            maxDate: new Date((d.getFullYear() - 18), d.getMonth(), day) - 10000,
            allowOldDates: true,
            allowFutureDates: false,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
        };


        $cordovaDatePicker.show(options).then(function(date){
            birthday = new Date(date);
            var month= birthday.getMonth();
            var day = birthday.getDate();
            month = month + 1;
            if(month < 10)
                month = '0'+month;

            if(day < 10)
                day = '0'+day;

            $scope.birthday_display = day + '/'+ month + '/'+birthday.getFullYear();
            $scope.formData.birthday = birthday.getFullYear() + '-'+ month + '-'+day;
        });
    }

    $scope.dateType = 'text';
    
    var geocoder = new google.maps.Geocoder();

    $scope.getAddressSuggestions = function(queryString){
        var defer = $q.defer();
        geocoder.geocode(
                {
                    address: queryString,
                    componentRestrictions: {country: 'BR'}
                },
                function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) { defer.resolve(results); }
                    else { defer.reject(results); }
                }
                );
        return defer.promise;
    }


    $scope.registar = function()
    {
        $ionicLoading.show();

        UserService.register($scope.formData).then(function(result){
            $ionicLoading.hide();
            if(result.data.status == 'success'){
                $scope.contentBg = 'assertive-bg';
                $timeout(function(){
                    localStorage.setItem('token', result.data.token);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Parabéns!',
                        template: result.data.msg,
                        buttons:[{
                            text: 'OK',
                            type: 'button-assertive'
                        }]
                    });
                    alertPopup.then(function(res) {
                        $state.go('tab.events_chef');
                    });
                }, 500);
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Atenção!',
                    template: result.data.msg,
                    buttons:[{
                        text: 'OK',
                        type: 'button-assertive'
                    }]
                });
            }
        });
    }
});
