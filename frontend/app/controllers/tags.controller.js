angular.module('myApp')
  .controller('TagsController', function($scope, $http, $window, $timeout, AuthService, tags) {
    try {
      if (!AuthService.isAuthenticated()) {
        $window.location.href = '#/articles';
      } else {
        $scope.tags = tags.data;
      }
    } catch (err) {
      console.error('ERROR: ', err)
      $scope.error = err.message;

      $timeout(function() {
        $scope.error = ''
      }, 3000);
    }
  })
