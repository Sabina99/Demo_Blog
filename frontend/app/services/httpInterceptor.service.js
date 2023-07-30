angular.module('myApp')
  .service('HttpInterceptor', function($q, $window) {
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
