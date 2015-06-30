/**
*  Module
*
* Description
*/
var INTEGER_REGEXP = /^\-?\d+$/;
angular.module('validation', []).
directive('integer', function() {
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		 	require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			controller.$validators.integer = function(modelValue, viewValue) {
				if (controller.$isEmpty(modelValue)) {
					return true;
				}
				if (INTEGER_REGEXP.test(viewValue)) {
					return true;
				}
				return false;
			};
		}
	};
}).
directive('username', function($q, $timeout) {
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			var usernames = ["A", "B", "C"];
			controller.$asyncValidators.username = function(modelValue, viewValue) {
				if (controller.$isEmpty(modelValue)) {
					return $q.when();
				}
				var def = $q.defer();
				$timeout(function() {
					if (usernames.indexOf(modelValue) === -1) {
						// the username is avaible
						def.resolve();
					} else {
						def.reject();
					}
				}, 2000);
				return def.promise;
			};
		}
	};
}).
directive('overwriteEmail', function() {
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: '', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			if (controller && controller.$validators.email) {
				return true;
			}
			return false;
		}
	};
});