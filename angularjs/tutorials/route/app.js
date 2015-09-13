/**
*  Module
*
* Description
*/
angular.module('sampleApp', []).
config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/AddNewOrder', {
			templateUrl : 'templates/add_order.html',
			controller : 'AddOrderController'
		}).
		when('/ShowOrders', {
			templateUrl : 'templates/show_orders.html',
			controller : 'ShowOrdersController'
		}).
		otherwise({
			redirectTo : '/AddNewOrder'
		});
}]).
controller('AddOrderController', ['$scope', function($scope)
{
	$scope.message = 'This is Add new order screen';
}]).
controller('ShowOrdersController', ['$scope', function($scope)
{
	$scope.message = 'This is Show orders screen';
}]);