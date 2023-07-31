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
        controller: 'ArticleController',
        resolve : {
          article: ($http, $route) => $http.get("https://blog_demo.local.test/api/articles/" + $route.current.params.id),
        }
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
      .when('/edit/article/:id', {
        templateUrl: 'app/views/edit-article.html',
        controller: 'EditArticleController',
        resolve : {
          article: ($http, $route) => $http.get("https://blog_demo.local.test/api/articles/" + $route.current.params.id),
          categories: ($http) => $http.get("https://blog_demo.local.test/api/categories"),
          tags: ($http) => $http.get("https://blog_demo.local.test/api/tags"),
        }
      })
      .when('/tags', {
        templateUrl: 'app/views/tags.html',
        controller: 'TagsController',
        resolve : {
          tags: ($http) => $http.get("https://blog_demo.local.test/api/tags"),
        }
      })
      .when('/categories', {
        templateUrl: 'app/views/categories.html',
        controller: 'CategoriesController',
        resolve : {
          categories: ($http) => $http.get("https://blog_demo.local.test/api/categories"),
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
