/**
*  Module
*
* Description
*/
angular.module('custom', []).
directive('contenteditable', function() {
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
			// view -> model
			iElm.on('blur', function() {
				controller.$setViewValue(iElm.html());
			});
			// model -> view
			controller.$render = function() {
				iElm.html(controller.$viewValue);
			};
			// load init value from DOM
			controller.$setViewValue(iElm.html());
		}
	};
});