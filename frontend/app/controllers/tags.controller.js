angular.module('myApp')
  .controller('TagsController', function($scope, $http, tags) {
    $scope.tags = tags.data;
    console.log(tags)
  })
