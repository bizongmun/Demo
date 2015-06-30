/**
*  Module
*
* Description
*/
angular.module('simple', []).
controller('SimpleController', ['$scope', function($scope)
{
	$scope.master = {};
	$scope.update = function(user)
	{
		$scope.master = angular.copy(user);
	};
	$scope.reset = function()
	{
		$scope.user = angular.copy($scope.master);
	};
	$scope.reset();
}]);