'use strict';

app.factory('Auth',
  function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL);

    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
      register: function (user) {
        return auth.$createUser(user.email, user.password);
      },
      signedIn: function () {
        return auth.user !== null;
      },
      login: function (user) {
        return auth.$login('password', user);
      },
      logout: function () {
        auth.$logout();
      }
    };

    $rootScope.signedIn = function () {
      return Auth.signedIn();
    };

    return Auth;
  });

// ORIGINAL
// =================
// app.factory('Auth', ['$rootScope', 'FIREBASE_URL', '$firebaseSimpleLogin', function($rootScope, FIREBASE_URL, $firebaseSimpleLogin){
// 	var ref = new Firebase(FIREBASE_URL);

// 	var auth = $firebaseSimpleLogin(ref);

// 	var Auth = {
// 		register: function(user){
// 			return auth.$createUser(user.email, user.password);
// 		},
// 		signedIn: function(){
// 			return auth.user !== null;	// user signed in if user property is not null
// 		},
// 		login: function(user){
// 			return auth.$login('password', user);	// type of login
// 		},
// 		logout: function(){
// 			auth.$logout();
// 		}
// 	};

// 	$rootScope.signedIn = function(){
// 		return Auth.signedIn();
// 	};

// 	return Auth;
// }]);