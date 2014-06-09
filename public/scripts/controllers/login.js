'use strict';

// handles login
app.controller('LoginCtrl', ["$scope", "$location", "Auth", function($scope, $location, Auth){
    $scope.viewLoading = false;

    $scope.$on('$firebaseSimpleLogin:login', function(){
      $location.path('/');
    });

    $scope.login = function(){
      $scope.viewLoading = true;

      Auth.login($scope.user).then(function(authUser){
        $location.path('/')
      }, function (error) {
        $scope.error = error.toString();
      });
    }
}]);