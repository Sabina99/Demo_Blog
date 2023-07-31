angular.module('myApp')
  .controller('CategoriesController', function($scope, $http, categories) {
    $scope.categories = categories.data
  })
