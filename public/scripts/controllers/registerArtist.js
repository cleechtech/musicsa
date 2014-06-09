'use strict'

app.controller('RegisterArtistCtrl', ['$scope', "$location", "Auth", "Artist", function($scope, $location, Auth, Artist){
	$scope.viewLoading = false;

	$scope.formData = {}

	$scope.addArtist = function(){
		$scope.viewLoading = true;

		// create new auth creds for artist
		Auth.register($scope.formData).then(function(authUser){
			console.log('authUser: ' + authUser)
		  // log artist in with their creds
		  Auth.login($scope.formData)

		  // create artist object in database
		  Artist.create(authUser, $scope.formData)

		  // redirect
		  $location.path('/');
		}, function (error) {
			console.log('error!! ' + error)
		  $scope.error = error.toString();
		})
	}
}])