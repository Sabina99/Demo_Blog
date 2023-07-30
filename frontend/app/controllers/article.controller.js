angular.module('myApp')
  .controller('ArticleController', function($scope, $routeParams, $http) {
    $scope.message = 'Single article with id ' + $routeParams.id;
    $http.get("https://blog_demo.local.test/api/articles/" + $routeParams.id)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  })
