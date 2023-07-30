angular.module('myApp')
  .controller('ArticleController', function($scope, $http, article) {
    console.log(article.data)
    $scope.article = article.data
  })
