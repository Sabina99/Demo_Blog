angular.module('myApp')
  .controller('CategoriesController', function($scope, $http, $timeout, $window, categories, AuthService) {
    try {
      if (!AuthService.isAuthenticated()) {
        $window.location.href = '#/articles';
      } else {
        $scope.categories = categories.data
      }
    } catch (err) {
      console.error('ERROR: ', err);
      $scope.error = err.message;

      $timeout(function() {
        $scope.error = ''
      }, 3000);
    }
  })
