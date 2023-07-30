angular.module('myApp', ['ngRoute', 'angularjs-dropdown-multiselect'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('HttpInterceptor');
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
