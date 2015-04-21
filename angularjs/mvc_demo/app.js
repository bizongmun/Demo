function FirstCtrl ($scope) {
    $scope.message = 'Hello! World!!!';
    $scope.action = function () {
       $scope.message = 'Goodbye, Angular!!!';
    };
}
