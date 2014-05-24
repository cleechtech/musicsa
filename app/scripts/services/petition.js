'use strict';

app.factory('Petition', ["$firebase", "FIREBASE_URL", "User", function($firebase, FIREBASE_URL, User){
	var ref = new Firebase(FIREBASE_URL + 'petitions');

	var petitions = $firebase(ref);

	var Petition = {
		all: petitions,
		create: function(petition){
			if(User.signedIn()){
				var user = User.getCurrent();

				petition.owner = user.username;

				// add image
				petition.image

				return petitions.$add(petition).then(function(ref){
					var petitionId = ref.name();

					user.$child('petitions').$child(petitionId).$set(petitionId);

					return petitionId;
				});
			}
		},
		find: function(petitionId){
			return petitions.$child(petitionId);
		},
		delete: function(petitionId){
			if(User.signedIn()){
				var petition = Petition.find(petitionId);

				petition.$on('loaded', function(){
					var user = User.findByUsername(petition.owner);

					petitions.$remove(petitionId).then(function(){
						user.$child('petitions').$remove(petitionId);
					})
				})
			}
		},
		addComment: function(petitionId, comment){
			if (User.signedIn()){
				var user = User.getCurrent();

				// create comment
				comment.username = user.username;
				comment.petitionId = petitionId;

				var petition = Petition.find(petitionId);	// get specific petition from entire petition object
				
				// add comment
				petition.$child('comments').$add(comment)
					.then(function(referenceFromFirebase){
						// add comment to user object
						user.$child('comments')
							.$child(referenceFromFirebase.name())
							.$set({ 
								id: referenceFromFirebase.name(),
								petitionId: petitionId
							})
					})
			}
		},
		deleteComment: function(petiton, comment, commentId){
			if (User.signedIn()){
				var user = User.findByUsername(comment.username);

				// remove from petition
				petiton.$child('comments').$remove(commentId)
					.then(function(){
						// remove from user
						user.$child('comments').$remove(commentId)
					})
			}
		}
	};

	return Petition;
}]);
