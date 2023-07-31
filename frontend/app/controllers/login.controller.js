angular.module('myApp')
  .controller('LoginController', function($scope, $timeout, AuthService) {
    $scope.userPassword = '';
    $scope.userEmail = '';
    $scope.login = function() {
      try {
        AuthService.loginUser({
          email: $scope.userEmail,
          password: $scope.userPassword
        })
      } catch (err) {
        console.error('ERROR: ', err)
        $scope.error = err.message;

        $timeout(function() {
          $scope.error = ''
        }, 3000);
      }
    }
  })
