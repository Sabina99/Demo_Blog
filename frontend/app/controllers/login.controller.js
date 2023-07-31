angular.module('myApp')
  .controller('LoginController', function($scope, AuthService) {
    $scope.userPassword = '';
    $scope.userEmail = '';
    $scope.login = function() {
      AuthService.loginUser({
        email: $scope.userEmail,
        password: $scope.userPassword
      })
    }
  })
