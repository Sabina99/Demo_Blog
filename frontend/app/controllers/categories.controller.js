angular.module('myApp')
  .controller('CategoriesController', function($scope, $http, $window, categories, AuthService) {
    if (!AuthService.isAuthenticated()) {
      $window.location.href = '#/articles';
    } else {
      $scope.categories = categories.data
    }
  })
