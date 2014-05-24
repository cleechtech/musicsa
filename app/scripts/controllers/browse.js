
app.controller('BrowseCtrl', ['$scope', 'SD', function($scope, SD){

	$scope.search = function(artist){
		SD.searchArtist(artist).then(function(data){
			$scope.results = data
		}, function(err){
			$scope.results = 'Sorry there was an error :('
		})
	}

	$scope.popularity = '-popularity'
}])