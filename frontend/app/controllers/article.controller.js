angular.module('myApp')
  .controller('ArticleController', function($scope, $http, $window, AuthService, article) {
    $scope.article = article.data;

    $scope.isUserLoggedIn = function() {
      return AuthService.isAuthenticated();
    }

    $scope.editArticle = function() {
      $window.location.href = '#/edit/article/' + $scope.article.id;
    }
  })
