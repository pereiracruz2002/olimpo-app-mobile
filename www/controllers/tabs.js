App.controller('TabsCtrl', function($scope, $state, $ionicTabsDelegate){
	$scope.onTabSelected = function(state_name){
			setTimeout(function() {
				$state.go(state_name, {});
			},20);
	}
	this.onTabDeselected = function(){
		console.log("onTabDeselected -  main");
	}
});
