'use strict';

app.controller('ViewPetitionCtrl', ['$scope', '$routeParams', 'Petition', function($scope, $routeParams, Petition){

	// load petition with spinner
	$scope.viewLoading = true;
	$scope.petition = Petition.find($routeParams.petitionId);
	$scope.petition.$on('loaded', function(){
		// hide loading spinner
		$scope.viewLoading = false;
	});

	// add comment to Petition
	$scope.addComment = function(){
		Petition.addComment($routeParams.petitionId, $scope.comment)
		$scope.comment = {};
	}

	$scope.removeComment = function(comment, commentId){
		Petition.deleteComment($scope.petition, comment, commentId);
	}
}])