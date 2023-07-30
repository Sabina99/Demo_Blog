angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/articles.html',
        controller: 'ArticlesController'
      })
      .when('/article/:id', {
        templateUrl: 'app/views/article.html',
        controller: 'ArticleController'
      })
      .when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginController'
      })
      .when('/create/article', {
        templateUrl: 'app/views/create-article.html',
        controller: 'CreateArticleController',
        resolve : {
          categories: ($http) => $http.get("https://blog_demo.local.test/api/categories"),
          tags: ($http) => $http.get("https://blog_demo.local.test/api/tags"),
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('ArticlesController', function($scope, $http) {
    $scope.message = 'Articles';
    $http.get("https://blog_demo.local.test/articles")
      .then(response => {
        $scope.articles = response.data;
        console.log($scope.articles)
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  })
  .controller('LoginController', function($scope, $http) {
    $scope.userPassword = '';
    $scope.userEmail = '';
    $scope.login = function() {
      console.log($scope.userEmail, $scope.userPassword)
      $http.post("https://blog_demo.local.test/api/login", {
        email: $scope.userEmail,
        password: $scope.userPassword
      })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log('ERROR: ', err)
        })
    }
  })
  .controller('ArticleController',  function($scope, $routeParams) {
    $scope.message = 'Single article with id ' + $routeParams.id;
  })
  .controller('CreateArticleController', function($scope, $http, categories, tags) {
      $scope.categories = categories.data;
      $scope.tags = tags.data;
      console.log($scope, $scope.categories, $scope.tags)

    $scope.articleForm = {
      title: "",
      excerpt: "",
      content: "",
      file: null,
      category: null,
      active: true,
      tags: []
    }

    $scope.submit = function() {
      console.log($scope.articleForm)
      // let file = document.getElementById('file').files[0];
      //
      // let fd = new FormData();
      // fd.append('file', file);
      // fd.append('title', $scope.articleForm.title);
      // fd.append('excerpt', $scope.articleForm.excerpt);
      // fd.append('content', $scope.articleForm.content);
      // fd.append('category', $scope.articleForm.category);
      // fd.append('active', $scope.articleForm.active);
      // fd.append('tags', $scope.articleForm.tags);
      //
      // $http.post("https://blog_demo.local.test/api/articles", fd, {
      //     headers: {'Content-Type': undefined}
      //   })
      //   .then(response => {
      //     console.log(response)
      //   })
      //   .catch(err => {
      //     console.log('ERROR: ', err)
      //   })
    }
  });
