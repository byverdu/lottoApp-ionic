/* global angular */

angular.module( 'lottoApp.controllers' )
  .controller( 'ResultsCtrl', function( $scope , sharedData) {
    $scope.raffle = sharedData.getData();
    console.log($scope, '$scope.raffle ResultsCtrl');
  });
