angular.module('myApp')
  .controller('ArticleController', function($scope, $http, article) {
    $scope.article = article.data
  })
