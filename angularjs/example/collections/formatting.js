/**
*  Module
*
* Description
*/
angular.module('formatting', []).
controller('FormattingController', ['$scope', '$filter', 'dateFilter', 
	function($scope, $filter, dateFilter)
{
	// Init
	$scope.stringData = "Example";
	$scope.dateData = new Date();

	// Utility
	$scope.formatDate = function(date, format)
	{
		return $filter("date")(date, format);
	};
}]);