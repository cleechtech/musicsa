'use strict';

app.controller('PetitionsCtrl', ['$scope', '$location','Petition', function($scope, $location, Petition){
	$scope.petitions = Petition.all

	$scope.viewLoading = true;	// show loading spinner

	$scope.petitions.$on('loaded', function(){
		// hide loading spinner
		$scope.viewLoading = false;
	});

	$scope.petition = {
		petitioning: '',
		action: '',
		description: '',
		image: ''
	};

	$scope.submitPetition = function(){
		Petition.create($scope.petition)
			.then(function(petitionId){
				// redirect to petition's page
				$location.path('/petitions/' + petitionId);
			});
	};

	$scope.deletePetition = function(petitionId){
		Petition.delete(petitionId);
	};

	$scope.register = false;
	$scope.login = false;
	$scope.showForm = function(type){
		if (type === 'register'){
			$scope.register = true;
			$scope.login = false;
		} else if (type === "login"){
			$scope.login = true;
			$scope.register = false;
		}
		
	};

}]);