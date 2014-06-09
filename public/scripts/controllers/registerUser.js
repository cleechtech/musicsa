'use strict'

app.controller('RegisterUserCtrl', ['$scope', "$location", "Auth", "User", function($scope, $location, Auth, User){
	$scope.viewLoading = false;

	$scope.formData = {}

  $scope.addUser = function(){
    $scope.viewLoading = true;
    
    // create new auth creds for user
    Auth.register($scope.formData).then(function(authUser){
      // log user in with their creds
      Auth.login($scope.formData)

      // create user object in database
      User.create(authUser, $scope.formData)

      // redirect
      $location.path('/');
    }, function (error) {
      $scope.error = error.toString();
    })
  }
}])