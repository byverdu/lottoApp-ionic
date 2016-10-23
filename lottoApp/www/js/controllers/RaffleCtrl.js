/* global angular */

function getBallValues( $scope ) {
  return $scope.raffle.combiToSave.map( combi => combi.ballValue );
}

angular.module( 'lottoApp.controllers' )
  .controller( 'RaffleCtrl', function (
    $scope,
    $stateParams,
    utilsService,
    sharedData,
    storageService
  ) {
    const mainCtrl = $scope;
    mainCtrl.raffle = sharedData.getData();
    mainCtrl.getCountChecked = function () {
      return mainCtrl.raffle.totalBalls.filter( item => item.isChecked ).length;
    };
    console.log($scope, 'RaffleCtrl');

    mainCtrl.getRandomBallsByLotto = function () {
      const lottoID = mainCtrl.raffle.data.lottoID;
      mainCtrl.raffle.combiToSave = utilsService.getRandomBallsByLotto( lottoID );

      mainCtrl.raffle.totalBalls.forEach( ball => {
        const innerBall = ball;
        if ( getBallValues( mainCtrl ).indexOf( innerBall.ballValue ) !== -1 ) {
          innerBall.isChecked = true;
        } else {
          innerBall.isChecked = false;
        }
      });
    };

    mainCtrl.saveSelectedNumbers = function () {
      const lottoID = mainCtrl.raffle.data.lottoID;
      const combi = mainCtrl.raffle.combiToSave;
      combi.forEach( item => item.isChecked = false );
      storageService.setStorageForId( lottoID, combi );
      mainCtrl.clearAndUncheck();
    };

    mainCtrl.clearAndUncheck = function () {
      const lottoID = mainCtrl.raffle.data.lottoID;
      mainCtrl.raffle.combiToSave = utilsService.setArrayForBall( lottoID, 'count', false );
      mainCtrl.raffle.totalBalls.forEach( ball =>  ball.isChecked = false );
    };

    mainCtrl.addBallToCombiToSave = function ( ball ) {
      // avoid add a ball
      if ( mainCtrl.getCountChecked() > mainCtrl.raffle.countBalls ) {
        const arrIndex = ball.ballValue - 1;
        mainCtrl.raffle.totalBalls[arrIndex].isChecked = false;
        return;
      }

      const numberConverted = Number( ball.ballValue );
      const lastZeroItem = getBallValues( mainCtrl ).lastIndexOf( 0 );
      const indexChecked = getBallValues( mainCtrl ).indexOf( numberConverted );

      if ( indexChecked === -1 ) {
        const tempObject = {
          ballValue: ball.ballValue,
          isChecked: ball.isChecked
        };
        Object.assign( mainCtrl.raffle.combiToSave[lastZeroItem], tempObject );
      } else {
        mainCtrl.raffle.combiToSave.splice( indexChecked, 1, new utilsService.BallModel( 0 ));
      }
      console.log( mainCtrl.raffle.combiToSave, 'addBallToCombiToSave' );
    };

    mainCtrl.addStringZero = utilsService.addStringZero;
  });
