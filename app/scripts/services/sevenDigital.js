'use strict'

app.factory('SD', ["$http", "$q", 'SD_BASE', 'SD_KEY', function($http, $q, SD_BASE, SD_KEY){

	// TODO: all these $http requests are the same. Abstract away!!

	return {
		artistTopTracks: function(artistId){
			var dfd = $q.defer()

			$http({
				url: SD_BASE + 'artist/toptracks',
				method: 'GET',
				headers: {
					// request from 7digit json API
					Accept: 'application/json'
				},
				params: {
					// artist search
					artistid: artistId,
					oauth_consumer_key: SD_KEY
				}
			}).success(function(data, status, headers, config) {
				dfd.resolve(data);
			}).error(function(err){
				dfd.reject(err)
			})
			return dfd.promise;
		},

		getTrack: function(trackId){
			var dfd = $q.defer()

			// can only get track as XML
			var xmlTransform = function(data) {
		        console.log("transform data");
		        var x2js = new X2JS();
		        var json = x2js.xml_str2json( data );
		        return json;
		    }

			$http({
				url: SD_BASE + 'track/details',
				method: 'GET',
				params: {
					// track search
					trackid: trackId,
					oauth_consumer_key: SD_KEY
				}
			}).success(function(data, status, headers, config) {
				var jsonTrack = xmlTransform(data)
				console.log(jsonTrack)
				dfd.resolve(jsonTrack);
			}).error(function(err){
				dfd.reject(err)
			})
			return dfd.promise
		},
		searchArtist: function(artist){
			var dfd = $q.defer()

			$http({
				url: SD_BASE + 'artist/browse',
				method: 'GET',
				headers: {
					// request from 7digit json API
					Accept: 'application/json'
				},
				params: {
					// artist search
					letter: artist,
					oauth_consumer_key: SD_KEY
				}
			}).success(function(data, status, headers, config) {
				dfd.resolve(data)
			}).error(function(err){
				dfd.reject(err)
			})
			return dfd.promise;
		}
	}

}])