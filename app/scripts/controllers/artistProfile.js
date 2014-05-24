'use strict'

app.controller('ArtistProfileCtrl', ['$scope', '$http', '$routeParams', 'SD', function($scope, $http, $routeParams, SD){

	// load top tracks for the artist
	SD.artistTopTracks($routeParams.artistId).then(function(data){
		$scope.topTracks = data
	})
}])