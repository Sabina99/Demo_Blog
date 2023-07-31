angular.module('myApp')

  .controller('CreateArticleController', function($scope, $http, $window, $timeout, AuthService, categories, tags) {

    $scope.error = "";
    if (!AuthService.isAuthenticated()) {
      $window.location.href = '#/articles';
    } else {
      $scope.tagError = "";
      $scope.categoryError = "";
      $scope.fileError = "";
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

      $scope.submit = function () {
        if (!$scope.articleForm.tags.length) {
          $scope.tagError = "Tags are required";
        } else {
          $scope.tagError = "";
        }

        if (!$scope.articleForm.category) {
          $scope.categoryError = "Category is required";
        } else {
          $scope.categoryError = ""
        }

        if ($scope.articleForm.category && $scope.articleForm.tags.length) {
          $scope.articleForm.tags = $scope.articleForm.tags.map(tag => tag.id ? tag.id : tag);
          let file = document.getElementById('file').files[0];

          if (!file) {
            $scope.fileError = "Image is required";
          } else {
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
                $scope.articleForm = {
                  title: "",
                  excerpt: "",
                  content: "",
                  file: null,
                  category: null,
                  active: true,
                  tags: []
                };
                if (response.data && response.data.id) {
                  $window.location.href = '#/article/' + response.data.id;
                }
              })
              .catch(err => {
                console.error('ERROR: ', err);
                $scope.error = err.data.message;
                $timeout(function() {
                  $scope.error = ''
                }, 3000);
              })
          }
        }
      }
    }
  });
