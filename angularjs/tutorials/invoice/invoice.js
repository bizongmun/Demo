/**

*  Module
*
* Description
*/
angular.module('invoice1', []).
controller('InvoiceController', function($scope) {
	$scope.qty = 3;
	$scope.cost = 2;
	$scope.inCurr = 'EUR';
	$scope.currencies = ['USD', 'EUR', 'CNY'];
	$scope.usdToForeignRates = {
		USD : 1,
		EUR : 0.74,
		CNY : 6.09
	};

	$scope.total = function ($scope, outCurr) {
		//return convertCurrency(qty * cost, inCurr, outCurr);
		return $scope.qty * $scope.cost;
	};

	$scope.convertCurrency = function (ammount, inCurr, outCurr) {
		return ammount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
	}
	$scope.pay = function () {
		window.alert('Thanks!');
	};
});
