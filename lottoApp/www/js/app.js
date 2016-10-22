/* global angular cordova StatusBar */
// Ionic lottoApp App

const moduleDepen = [
  'ionic',
  'ngStorage',
  'lottoApp.controllers',
  'lottoApp.services',
  'lottoApp.directives'
];

angular.module( 'lottoApp', moduleDepen )

.run( function ( $ionicPlatform ) {
  $ionicPlatform.ready( function () {
    if ( window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard ) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
      cordova.plugins.Keyboard.disableScroll( true );
    }
    if ( window.StatusBar ) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config( function ( $stateProvider, $urlRouterProvider ) {

  $stateProvider
  .state( 'home', {
    url: '/lottoApp',
    templateUrl: 'templates/tab-home.html',
    controller: 'HomeCtrl'
  })
  // setup an abstract state for the tabs directive
  .state( 'tab', {
    url: '/lottoApp/:lottoID',
    abstract: true,
    cache: false,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })
  .state( 'tab.raffle', {
    url: '/raffle',
    views: {
      'tab-raffle': {
        templateUrl: 'templates/tab-raffle.html',
        controller: 'RaffleCtrl'
      }
    }
  })
  .state( 'tab.results', {
    url: '/results',
    views: {
      'tab-results': {
        templateUrl: 'templates/tab-results.html',
        controller: 'ResultsCtrl'
      }
    }
  })
  .state( 'tab.stats', {
    url: '/stats',
    views: {
      'tab-stats': {
        templateUrl: 'templates/tab-stats.html',
        controller: 'StatsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise( '/lottoApp' );
});
