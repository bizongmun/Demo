/**
*  Module
*
* Description
*/
angular.module('scope', []).
controller('ScopeController', ['$scope', function($scope) {
	$scope.name = 'Luan';
	$scope.greeting = '';
	$scope.greet = function() {
		$scope.greeting = "Hello " + $scope.name;
	};
}]);