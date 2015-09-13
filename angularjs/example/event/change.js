/**
*  Module
*
* Description
*/
angular.module('change', []).
controller('ChangeController', ['$scope', function($scope) {
	$scope.onEditValueResult = "";
	$scope.onEditValueChange = function ()
	{
		$scope.onEditValueResult = $scope.editValue;
	};
}]);