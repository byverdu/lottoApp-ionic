/* global angular */

function getBallValues( $scope ) {
  return $scope.raffle.combiToSave.map( combi => combi.ballValue );
}

function getCombiSorted( $scope ) {
  return $scope.raffle.combiToSave.sort(( a, b ) => a.ballValue - b.ballValue );
}

angular.module( 'lottoApp.controllers' )
  .controller( 'RaffleCtrl', function (
    $scope,
    $stateParams,
    httpService,
    utilsService,
    storageService
  ) {
    const mainCtrl = $scope;
    console.log($stateParams);
    httpService.getLottoById( $stateParams.lottoID ).then( data => {
      console.log(data);
      const lottoID = $stateParams.lottoID;
      mainCtrl.raffle = {
        data: data.data[lottoID],
        combiToSave: utilsService.setArrayForBall( lottoID, 'count', false ),
        totalBalls: utilsService.setArrayForBall( lottoID, 'total', true ),
        countBalls: utilsService.getCountBalls( lottoID )
      };

      mainCtrl.getCountChecked = function () {
        return mainCtrl.raffle.totalBalls.filter( item => item.isChecked ).length;
      };
      mainCtrl.combinations = storageService.getStorageForId( lottoID );
    });
    storageService.setStorageForLottos();

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
        }
        Object.assign( mainCtrl.raffle.combiToSave[lastZeroItem], tempObject );
        getCombiSorted( mainCtrl );
      } else {
        mainCtrl.raffle.combiToSave.splice( indexChecked, 1, new utilsService.BallModel( 0 ));
        getCombiSorted( mainCtrl );
      }
      console.log(mainCtrl.raffle.combiToSave,'addBallToCombiToSave')
    }
  });
