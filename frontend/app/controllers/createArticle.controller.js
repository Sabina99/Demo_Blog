angular.module('myApp')
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
          $scope.articleForm = {
            title: "",
            excerpt: "",
            content: "",
            file: null,
            category: null,
            active: true,
            tags: []
          };
        })
        .catch(err => {
          console.log('ERROR: ', err)
        })
    }
  });
