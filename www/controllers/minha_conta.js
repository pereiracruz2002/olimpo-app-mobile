App.controller('minha_contaCtrl', function($scope, $rootScope, $timeout,UserService, $ionicPopup, $ionicLoading, $q, $cordovaCamera, $ionicPlatform){
	$scope.formData= {};
	$ionicLoading.show();

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
                $scope.formData.new_picture = "data:image/jpeg;base64," + imageData;
                console.log($scope.formData.picture);
            }, function(err) {
                // error
            });
        }
    })

	UserService.getInfo().then(function(result){
		$scope.formData=result.data;
		$scope.formData.token = localStorage.getItem('token')

		if(result.data.birthday){
			var str_birthday = result.data.birthday.split('-');
			$scope.formData.birthday = new Date(str_birthday[0], str_birthday[1], str_birthday[2]);
		}
		
		$ionicLoading.hide();
	})
	$scope.editarDados= function(){
		$ionicLoading.show();
		UserService.editarDados($scope.formData).then(function(result){
			$ionicLoading.hide();
			$ionicPopup.alert({
				template: result.data.msg				
			})			
		})
	}

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
});