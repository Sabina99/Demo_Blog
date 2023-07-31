angular.module('myApp')
  .controller('ArticlesController', function($scope, $http, $timeout) {
    $scope.error = "";
    $http.get("https://blog_demo.local.test/api/articles")
      .then(response => {
        $scope.articles = response.data;
      })
      .catch(err => {
        console.error('ERROR: ', err)
        $scope.error = err.message;
        $timeout(function() {
          $scope.error = ''
        }, 3000);
      })
  })
