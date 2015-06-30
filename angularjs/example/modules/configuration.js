var PersonManager = function()
{
	var fullNameSeparator = " ";
	return {
		setFullNameSeparator : function(separator)
		{
			fullNameSeparator = separator;
		},
		$get: function(person)
		{
			return {
				getFirstName : function()
				{
					return person.first;
				},
				getSecondName : function()
				{
					return person.second;
				},
				getFullName : function()
				{
					return person.first + fullNameSeparator + person.second;
				}
			};
		}
	};
};
/**
*  Module
*
* Description
*/
angular.module('configuration', []).
value('person', {
	first : '',
	second : ''
}).
provider('personManager', PersonManager).
config(function(personManagerProvider) {
	personManagerProvider.setFullNameSeparator(" & ");
}).
run(function(person) {
	person.first = 'Luan';
	person.second = 'Nguyet';
}).
controller('ConfigurationController', function($scope, person, personManager) {
	$scope.personInstance = person;
	$scope.personManagerInstance = personManager;
});