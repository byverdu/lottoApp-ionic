/* global angular */

angular.module( 'lottoApp.controllers' )
  .controller( 'ResultsCtrl', function(
    $scope,
    sharedData,
    utilsService,
    storageService
  ) {
    const resultCtrl = $scope;
    resultCtrl.raffle = sharedData.getData();
    resultCtrl.containsMatched = [];
    console.log(resultCtrl, '$scope.raffle ResultsCtrl');

    resultCtrl.addStringZero = utilsService.addStringZero;
    resultCtrl.compareLastResultWithSaved = function() {
      const lastResult = resultCtrl.raffle.lastResult;
      const combinations = resultCtrl.raffle.combinations;
      if ( lastResult === undefined || combinations === undefined ) {
        return;
      }

      combinations.forEach(( combi, index ) => {
        combi.forEach( ball => {
          if ( lastResult.indexOf( ball.ballValue ) !== -1 ) {
            ball.isChecked = true;
            if ( resultCtrl.containsMatched.indexOf( index ) === -1 ) {
              resultCtrl.containsMatched.push( index );
            }
          }
        });
      });
    };

    resultCtrl.clearCompared = function () {
      const combinations = resultCtrl.raffle.combinations;
      if ( combinations === undefined ) {
        return;
      }
      combinations.forEach( combi => {
        combi.forEach( ball => ball.isChecked = false );
      });
      resultCtrl.containsMatched = [];
    };

    resultCtrl.deleteCombiFromStore = function ( index ) {
      const lottoID = resultCtrl.raffle.data.lottoID;
      storageService.removeItemForId( lottoID, index );
    };
  });
