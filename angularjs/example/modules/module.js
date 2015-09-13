/**
*  Module
*
* Description*/
angular.module('myApp', []).
controller('simpleController', function($scope) {
	$scope.person = {
		first : "John",
		second : "Doe",
		getFullName: function () {
			return this.first + " " + this.second;
		}
	};
});

/**
*  Module
*
* Description
*/
angular.module('registeringvalue', []).
value('person', {
	first : "",
	second : "",
	getFullName : function() {
		return this.first + " - " + this.second;
	}
}).
controller('simpleController', function($scope, person) {
	person.first = 'Dang Van';
	person.second = 'Luan';
	$scope.personInstance = person;
});

/**
*  Module
*
* Description
*/
/*var PersonManager = function(person) 
{
	this.personInstace = person;
};

PersonManager.prototype.getFirstName = function() {
	return this.personInstace.first;
};

PersonManager.prototype.getSecondName = function() {
	return this.personInstace.second;
};

PersonManager.prototype.getFullName = function(separator) {
	return this.personInstace.first + separator + this.personInstace.second;
};

angular.module('registeringservice', []).
value('person', {
	first : '',
	second : ''
}).
service('personManager', PersonManager).
controller('simpleController', function($scope, person, personManager) {
	person.first = 'PHP';
	person.second = 'Java';
	$scope.personMangerInstace = personManager;
});*/
