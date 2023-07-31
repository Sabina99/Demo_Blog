angular.module('myApp')
  .controller('NavBarController', function($scope, $location, AuthService) {
    $scope.isActive = function(path) {
      return $location.path() === path;
    }

    $scope.isUserLoggedIn = function() {
      return AuthService.isAuthenticated()
    }
  })
