/**
*  Module
*
* Description
*/
angular.module('repeater', []).
controller('RepeaterController', ['$scope', function($scope) {
	$scope.areAllPeopleSelected = false;
	$scope.people = [
		{firstName: "A", lastName: "B"},
		{firstName: "C", lastName: "D"},
		{firstName: "E", lastName: "F"},
		{firstName: "G", lastName: "H"}
	];
	$scope.selectablePeople = [
      {firstName: "John", lastName: "Doe", isSelected: false},
      {firstName: "Bob", lastName: "Smith", isSelected: false},
      {firstName: "Jack", lastName: "White", isSelected: false},
      {firstName: "Michael", lastName: "Green", isSelected: false}
    ];
    $scope.stringArray = [];
    var currStringIndex = 0;
    // update all selections
    $scope.updatePeopleSelection = function (peopleArray, selectionValue)
    {
    	for (var i = 0; i < peopleArray.length; i++) {
    		peopleArray[i].isSelected = selectionValue;
    	}
    };

    $scope.addStringToArray = function()
    {
    	$scope.stringArray.push("Item" + currStringIndex);
    	currStringIndex ++;
    };
    $scope.removeStringFromArray = function(index)
    {
    	if (index >= 0 && index < $scope.stringArray.length) {
    		$scope.stringArray.splice(index, 1);
    	}
    };
}]);
