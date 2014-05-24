'use strict';

app.directive('spinner', function(){
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			loading: '=spinner'
		},
		templateUrl: 'views/templates/loading.html',
		link: function(scope, element, attrs){
			var spinner = new Spinner().spin();
			var loadingContainer = element.find('.spinner-container')[0];
			loadingContainer.appendChild(spinner.el);
		}
	}
})