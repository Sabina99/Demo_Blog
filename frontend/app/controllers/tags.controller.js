angular.module('myApp')
  .controller('TagsController', function($scope, $http, $window, AuthService, tags) {
    if (!AuthService.isAuthenticated()) {
      $window.location.href = '#/articles';
    } else {
      $scope.tags = tags.data;
    }
  })
