/**
*  Module
*
* Description
*/
angular.module('directive', []).
controller('Controller', ['$scope', function($scope)
{
	$scope.customer = {
		name: 'Luan',
		address: 'Ha Noi, Viet Nam'
	};
}]).
directive('myCustomer', function() {
	return {
		template: 'Name: {{customer.name}} Address: {{customer.address}}'
	};
});