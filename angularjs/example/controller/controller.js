angular.module('myApp', []).
controller('simpleController', function($scope) {
	// initialize the model variables
	$scope.first = 'Luan';
	$scope.second = 'Nguyet';
	$scope.data = {
		name : "Angular"
	};
	$scope.getResult = function () 
	{
		return $scope.first + ' love ' + $scope.second;	
	};
});