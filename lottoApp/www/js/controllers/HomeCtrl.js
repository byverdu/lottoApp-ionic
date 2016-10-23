/* global angular */

angular.module( 'lottoApp.controllers' )
  .controller( 'HomeCtrl', function( $scope, httpService ) {
    httpService.getLottos().then( data => {
      $scope.lottos = data.data.lottos;
    });

  });
