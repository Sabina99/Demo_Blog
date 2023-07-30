angular.module('myApp', ['ngRoute', 'angularjs-dropdown-multiselect'])
  .factory('MyHttpInterceptor', function($q, $window) {
    return {
      request: function(config) {
        const token = $window.localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
      }
    };
  })
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('MyHttpInterceptor');
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
  .service('authService', function ($http,$window) {
    function loginUser(user) {
        $http.post("https://blog_demo.local.test/api/login", user)
          .then(function (response) {
            if (response.data?.authorisation?.token) {
              $window.localStorage.setItem('token', response.data.authorisation.token);
            }
          })
          .catch(err => {
            console.log('EEROORRRRRRR', err)
          })
      }
      function isAuthenticated() {
        const token = $window.localStorage.getItem('token');
        return !!token;
      }
      function getToken() {
        return $window.localStorage.getItem('token');
      }

      return {
        loginUser,
        getToken,
        isAuthenticated
      }
  })
  .service('noAuthService', function ($http,$window) {
    return {
      // ???
    }
  })
  .controller('ArticlesController', function($scope, $http) {
    $scope.message = 'Articles';
    $http.get("https://blog_demo.local.test/api/articles")
      .then(response => {
        $scope.articles = response.data;
        console.log($scope.articles)
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  })
  .controller('LoginController', function($scope, authService) {
    $scope.userPassword = '';
    $scope.userEmail = '';
    $scope.login = function() {
      authService.loginUser({
        email: $scope.userEmail,
        password: $scope.userPassword
      })
      console.log(authService.getToken())
    }
  })
  .controller('ArticleController', function($scope, $routeParams, $http) {
    $scope.message = 'Single article with id ' + $routeParams.id;
    $http.get("https://blog_demo.local.test/api/articles/47")
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log('ERROR: ', err)
      })
  })
  .controller('CreateArticleController', function($scope, $http, categories, tags) {
    $scope.dropdownSettings = {
      scrollableHeight: '200px',
      scrollable: true,
      enableSearch: true,
      showCheckAll: false,
      showUncheckAll: false,
      checkBoxes: true,
      styleActive: true,
      displayProp: 'name'
    };
    $scope.categories = categories.data;
    $scope.tags = tags.data;

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
      $scope.articleForm.tags = $scope.articleForm.tags.map(tag => tag.id);
      let file = document.getElementById('file').files[0];

      let fd = new FormData();
      fd.append('file', file);
      fd.append('title', $scope.articleForm.title);
      fd.append('excerpt', $scope.articleForm.excerpt);
      fd.append('content', $scope.articleForm.content);
      fd.append('category', $scope.articleForm.category);
      fd.append('active', $scope.articleForm.active);
      fd.append('tags', $scope.articleForm.tags);

      $http.post("https://blog_demo.local.test/api/articles", fd, {
          headers: {'Content-Type': undefined}
        })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log('ERROR: ', err)
        })
    }
  });
