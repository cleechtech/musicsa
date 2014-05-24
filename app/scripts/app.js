'use strict';
/* global app:true */

var app = angular.module('musicsa', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'firebase'
])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'PetitionsCtrl'
      })
      // .when('/petitions', {
      //   templateUrl: 'views/petitions/all.html',
      //   controller: 'PetitionsCtrl'
      // })
      // .when('/start-a-petition', {
      //   templateUrl: 'views/petitions/new.html',
      //   controller: 'PetitionsCtrl'
      // })
      // .when('/petitions/:petitionId', {
      //   templateUrl: 'views/petitions/view.html',
      //   controller: 'ViewPetitionCtrl'
      // })
      .when('/browse', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseCtrl'
      })
      .when('/artists/:artistId', {
        templateUrl: 'views/artistProfile.html',
        controller: 'ArtistProfileCtrl'
      })
      .when('/tracks/:trackId', {
        templateUrl: 'views/showTrack.html',
        controller: 'ShowTrackCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  }])


app.constant('FIREBASE_URL', 'https://musicsa.firebaseio.com/')

app.constant('SD_BASE', 'http://api.7digital.com/1.2/')

app.constant('SD_KEY', "7d98vwwcf34y")