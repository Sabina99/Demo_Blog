angular.module('myApp')
  .controller('NavBarController', function($scope, $location) {
    $scope.isActive = function(path) {
      return $location.path() === path;
    }
  })
