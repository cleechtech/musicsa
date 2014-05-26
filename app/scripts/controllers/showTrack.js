'use strict'

app.controller('ShowTrackCtrl', ['$scope', '$routeParams', 'SD', function($scope, $routeParams, SD){
	// get track as JSON from 7digital API
	var trackId = $routeParams.trackId

	SD.getTrack(trackId).then(function(data){
		$scope.track = data.response.track
	}, function(err){
		$scope.error = true
	})

	// music streaming from 7digital API
	var trackDetails = {
		trackId: parseInt(trackId),
		formatId: 1
	}

	$scope.streamTrack = function(){
		console.log(trackDetails)
	}

	// stream track
	SD.stream(trackDetails)
}])

/*
 oauth
 trackId
 formatId
 country
*/