angular.module('myApp')
  .controller('EditArticleController', function($scope, $http, $window, AuthService, article, categories, tags) {
    if (!AuthService.isAuthenticated()) {
      $window.location.href = '#/articles';
    } else {
      $scope.tagError = "";
      $scope.categoryError = "";
      $scope.fileError = "";
      $scope.categories = categories.data;
      $scope.article = article.data;
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
      $scope.tags = tags.data;
      $scope.articleForm = {
        title: $scope.article.title,
        content:  $scope.article.content,
        excerpt:  $scope.article.excerpt,
        category: $scope.article.category,
        tags:  $scope.tags.filter(tag => $scope.article.tags.find(articleTag => articleTag.id === tag.id))
      }
    }

    $scope.submit = function() {
      if (!$scope.articleForm.tags.length) {
        $scope.tagError = "Tags are required";
      } else {
        $scope.tagError = "";
      }

      if (!$scope.articleForm.category) {
        $scope.categoryError = "Category is required";
      } else {
        $scope.categoryError = "";
      }

      if ($scope.articleForm.category && $scope.articleForm.tags.length) {
        $scope.articleForm.tags = $scope.articleForm.tags.map(tag => tag.id ? tag.id : tag);
        $scope.articleForm.category = $scope.articleForm.category.id ? $scope.articleForm.category.id : $scope.articleForm.category;
        let file = document.getElementById('file').files[0];

        console.log($scope.articleForm)
        let fd = new FormData();
        if (file) {
          fd.append('file', file);
        }
        fd.append('title', $scope.articleForm.title);
        fd.append('excerpt', $scope.articleForm.excerpt);
        fd.append('content', $scope.articleForm.content);
        fd.append('category', $scope.articleForm.category);
        fd.append('active', $scope.articleForm.active);
        fd.append('tags', $scope.articleForm.tags);

        console.log(fd)
        $http.put("https://blog_demo.local.test/api/articles/" + $scope.article.id, fd, {
          headers: {'Content-Type': "x-www-url-formurlencoded'"}
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
            console.log('ERROR: ', err)
          })
      }
    }
  })
