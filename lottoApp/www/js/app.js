// Ionic lottoApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'lottoApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'lottoApp.services' is found in services.js
// 'lottoApp.controllers' is found in controllers.js
angular.module( 'lottoApp', [ 'ionic', 'ngStorage', 'lottoApp.controllers', 'lottoApp.services', 'lottoApp.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
    controller: function( $scope, $stateParams ) {
      $scope.lottoID = $stateParams.lottoID;
    }
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

  // Each tab has its own nav history stack:

  // .state( 'tab.dash', {
  //   url: '/dash',
  //   views: {
  //     'tab-dash': {
  //       templateUrl: 'templates/tab-dash.html',
  //       controller: 'DashCtrl'
  //     }
  //   }
  // })

  .state( 'tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: 'templates/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })
    .state( 'tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state( 'tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise( '/lottoApp' );

});
