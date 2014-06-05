'use strict';

app.factory('User', ["$rootScope", "Auth", "$firebase", "FIREBASE_URL", function($rootScope, Auth, $firebase, FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL + 'users');	// create object to hold all user info
	
	var users = $firebase(ref);	// firebase 'users' collection
	
	var User = {
		create: function(authUser, userData){
			users[userData.username] = {
				md5_hash: authUser.md5_hash,
				name: userData.name,
				username: userData.username,
				email: userData.email,
				$priority: authUser.uid	// unique way of finding a user (firebase)
			};
			
			users.$save(userData.username)	// save to database
				.then(function(){
					setCurrentUser(userData.username)
				});	
		},
		findByUsername: function(username){
			if(username){
				return users.$child(username);
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
		$rootScope.currentUser = User.findByUsername(username);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser){
		var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));

		// on load get current user's information
		query.$on('loaded', function(){
			setCurrentUser(query.$getIndex()[0]);
		})
	})
	
	return User;
}]);
