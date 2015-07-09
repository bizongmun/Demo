/**
*  Module
*
* Description
*/
angular.module('directive', []).
controller('Controller', ['$scope', function($scope)
{
	$scope.data1 = {name: "Luan", age: "24"};
	$scope.data2 = {name: "Nguyet", age: "24"};
}]).
directive('myCustomer', function() {
	return {
		restrict : 'E',
		scope: {
			customerInfo : '=info'
		},
		template : 'Name: {{customerInfo.name}} - Age: {{customerInfo.age}}'
	};
});