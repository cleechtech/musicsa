'use strict'

app.controller('ShowTrackCtrl', ['$scope', '$routeParams', 'SD', function($scope, $routeParams, SD){
	// get track as JSON from 7digital API
	SD.getTrack($routeParams.trackId).then(function(data){
		$scope.track = data.response.track
	}, function(err){
		$scope.error = true
	})
}])