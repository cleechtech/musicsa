'use strict';

app.controller('AuthCtrl',
  function($scope, $location, Auth, User){
    $scope.viewLoading = false;

    $scope.$on('$firebaseSimpleLogin:login', function(){
      // $location.path('/');
    });

    $scope.login = function(){
      $scope.viewLoading = true;

      Auth.login($scope.user).then(function(){
        if ($location.path() !== '/start-a-petition'){
          $location.path('/');
        }
      }, function (error) {
        $scope.error = error.toString();
      });
    };

    $scope.register = function(){
      $scope.viewLoading = true;
      
      Auth.register($scope.user).then(function(authUser){
        Auth.login($scope.user)
      	User.create(authUser, $scope.user.username)

        if ($location.path() !== '/start-a-petition'){
          $location.path('/');
        }
      }, function (error) {
        $scope.error = error.toString();
      });
    };
  });