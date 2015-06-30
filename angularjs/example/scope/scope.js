/**
*  Module
*
* Description
*/
angular.module('hierarchies', []).
controller('HierarchiesController', ['$scope', '$rootScope', 
	function($scope, $rootScope) {
	$scope.name = ' AngularJS';
	$rootScope.department = ' root';
}]).
controller('ListController', ['$scope', function($scope) {
	$scope.names = ['Luan', 'Nguyet'];
}]);

/**
*  Module
*
* Description
*/
angular.module('event', []).
controller('EventController', ['$scope', function($scope) {
	$scope.count = 0;
	$scope.$on('MyEvent', function() {
		$scope.count ++;
	});
}]);