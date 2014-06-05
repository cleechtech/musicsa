'use strict';
/* global app:true */

var app = angular.module('musicsa', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'firebase'
]) 

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html'
      })
      // Artist registration
      .state('a-register', {
        url: '/register-artist',
        templateUrl: 'views/register-artist/register.html',
        controller: 'RegisterArtistCtrl'
      })
      .state('a-register.basic', {
        url: '/basic',
        templateUrl: 'views/register-artist/register-basic.html'
      })
      .state('a-register.upload', {
        url: '/upload',
        templateUrl: 'views/register-artist/register-upload.html'
      })
      .state('a-register.billing', {
        url: '/billing',
        templateUrl: 'views/register-artist/register-billing.html'
      })

      // User registration
      .state('u-register', {
        url: '/register-user',
        templateUrl: 'views/register-user/register.html',
        controller: 'RegisterUserCtrl'
      })
      .state('u-register.basic', {
        url: '/basic',
        templateUrl: 'views/register-user/register-basic.html'
      })
      .state('u-register.billing', {
        url: '/billing',
        templateUrl: 'views/register-user/register-billing.html'
      })


      // .state('profile', {
      //   url: '/artists/:artistId',
      //   templateUrl: 'views/artistProfile.html',
      //   controller: 'ArtistProfileCtrl'
      // })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })

      // catch all route
      $urlRouterProvider.otherwise('/')
  }])


app.constant('FIREBASE_URL', 'https://musicsa.firebaseio.com/')