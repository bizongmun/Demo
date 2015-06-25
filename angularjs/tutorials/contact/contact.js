function ContactController ($scope) 
{
	$scope.contacts = ["123@yahoo.co.jp", "bizongcntt1990@gmail.com"];
	$scope.add = function() {
		$scope.contacts.push($scope.newcontact);
		$scope.newcontact = "";
	};
}

/**
*  Module
*
* Description
*/
angular.module('contact', []).
controller('ContactController', ContactController);


/*angular.module('contact', []).controller('ContactController', ['$scope', function ContactController($scope) {
    $scope.contacts = ["abcd@gmail.com", "abcd@yahoo.co.in"];
    $scope.add = function() {
        $scope.contacts.push($scope.newcontact);
        $scope.newcontact = "";

    };
}]);*/

/*function ContactController($scope) {
    $scope.contacts = ["abcd@gmail.com", "abcd@yahoo.co.in"];

    $scope.add = function() {
        $scope.contacts.push($scope.newcontact);
        $scope.newcontact = "";

    };
}
ContactController.$inject = ['$scope'];
angular.module('contact', []).controller('ContactController', ContactController)*/