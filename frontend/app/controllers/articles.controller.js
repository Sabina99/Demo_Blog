angular.module('myApp')
  .controller('ArticlesController', function($scope, $http) {
    $scope.message = 'Articles';
    $http.get("https://blog_demo.local.test/api/articles")
      .then(response => {
        $scope.articles = response.data;
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  })
