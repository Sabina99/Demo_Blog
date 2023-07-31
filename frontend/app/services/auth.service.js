angular.module('myApp')
  .service('AuthService', ['$http', '$window', function ($http, $window) {
    function loginUser(user) {
      $http.post("https://blog_demo.local.test/api/login", user)
        .then(function (response) {
          if (response.data?.authorisation?.token) {
            $window.localStorage.setItem('token', response.data.authorisation.token);
            $window.location.href = '#/';
          }
        })
        .catch(err => {
          console.log('ERROR: ', err)
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
  }])
