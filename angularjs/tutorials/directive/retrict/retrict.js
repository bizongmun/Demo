/**
*  Module
*
* Description
*/
angular.module('directive', []).
controller('Controller', ['$scope', function($scope)
{
	$scope.customer = {
		name: 'DVL',
		age : 24
	};
}]).
directive('myCustomer', function() {
	return {
		retrict: 'E',
		template: 'Name: {{customer.name}} - Age: {{customer.age}}'
	};
});