'use strict'

app.controller('RegisterUserCtrl', ['$scope', "$location", "Auth", "User", function($scope, $location, Auth, User){
	$scope.viewLoading = false;

	// holds all form data
	$scope.formData = {}

	 $scope.addUser = function(formData){
      $scope.viewLoading = true;
      
      // authenticate user
      Auth.register(formData).then(function(authUser){
        Auth.login(formData)
        // create user
      	User.create(authUser, formData.username)
      	$location.path('/')
      }, function (error) {
        $scope.error = error.toString();
      });
    };
}])