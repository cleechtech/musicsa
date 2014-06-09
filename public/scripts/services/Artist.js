'use strict';

app.factory('Artist', ["$rootScope", "Auth", "$firebase", "FIREBASE_URL", function($rootScope, Auth, $firebase, FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL + 'artists');	// create object to hold all user info
	
	var artists = $firebase(ref);	// firebase 'artists' collection
	
	var Artist = {
		create: function(authUser, formData){
			artists[formData.username] = {
				md5_hash: authUser.md5_hash,
				name: formData.name,
				username: formData.username,
				email: formData.email,
				accountNum: formData.accountNum,
				bank: formData.bank,
				$priority: authUser.uid	// unique way of finding a user (firebase)
			};
			
			artists.$save(formData.username)	// save to database
				.then(function(){
					setCurrentUser(formData.username)
				});	
		},
		findByUsername: function(username){
			if(username){
				return artists.$child(username);
			}
		},
		getCurrent: function(){
			return $rootScope.currentUser;
		},
		signedIn: function(){
			return Auth.signedIn();
		}
	};

	function setCurrentUser(username){
		$rootScope.currentUser = Artist.findByUsername(username);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser){
		var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));

		// on load get current user's information
		query.$on('loaded', function(){
			setCurrentUser(query.$getIndex()[0]);
		})
	})
	
	return Artist;
}]);
