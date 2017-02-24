App.controller('EventsPublic', function($scope, $rootScope, $timeout,EventsService, $ionicLoading, $q){
	$scope.myModel= {'tab': 1};
	$ionicLoading.show();
	// EventsService.getEventsPublic().then(function(result){
 //        $scope.eventos = result.data;
 //        $ionicLoading.hide();
 //    })
	$scope.formData = {
                    city: "",
                };


    $scope.$watch('formData.city', function(){
        var dados = $scope.formData.city;
        if(typeof dados === 'object'){

        	var cidade = dados.address_components[1].short_name;
        	var estado = dados.address_components[2].short_name;
            EventsService.getEventsPublic(cidade, estado).then(function(result){

	        	$scope.eventos = result.data;
                console.log($scope.eventos[0].qtd)
	        	$ionicLoading.hide();
    		})
        }else{
        	EventsService.getEventsPublic().then(function(result){
	        	$scope.eventos = result.data;
	        	$ionicLoading.hide();
    		})
        	$ionicLoading.hide();
        }
    });



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
