/**
*  Module
*
* Description
*/
// Definition of a PersonManager object
var PersonManager = function(person)
{
	// Private variables
	var personInstance = person;
	return {
		getFirstName: function() {
			return personInstance.first;
		},
		getSecondName : function() {
			return personInstance.second;
		},
		getFullName : function(separator) {
			return personInstance.first + separator + personInstance.second;
		}
	};
};
angular.module('registeringfactory', []).
value('person', {
	first : '',
	second : ''
}).
factory('personManager', PersonManager).
controller('FactoryController', function($scope, person, personManager) {
	person.first = 'John';
	person.second = 'Doe';
	$scope.personInstance = person;
	$scope.personManagerInstance = personManager;
});
