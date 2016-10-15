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
    utilsService
  ) {
    console.log($stateParams);
    httpService.getLottoById( $stateParams.lottoID ).then( data => {
      console.log(data);
      const lottoID = $stateParams.lottoID;
      $scope.raffle = {
        data: data.data[lottoID],
        combiToSave: utilsService.setArrayForBall( lottoID, 'count', false ),
        totalBalls: utilsService.setArrayForBall( lottoID, 'total', true ),
        countBalls: utilsService.getCountBalls( lottoID )
      };

      $scope.getCountChecked = function () {
        return $scope.raffle.totalBalls.filter( item => item.isChecked ).length;
      };
    });

    $scope.getRandomBallsByLotto = function() {
      const lottoID = $scope.raffle.data.lottoID;
      $scope.raffle.combiToSave = utilsService.getRandomBallsByLotto( lottoID );

      $scope.raffle.totalBalls.forEach( ball => {
        const innerBall = ball;
        if ( getBallValues( $scope ).indexOf( innerBall.ballValue ) !== -1 ) {
          innerBall.isChecked = true;
        } else {
          innerBall.isChecked = false;
        }
      });
    };

    $scope.clearAndUncheck = function () {
      const lottoID = $scope.raffle.data.lottoID;
      $scope.raffle.combiToSave = utilsService.setArrayForBall( lottoID, 'count', false );
      $scope.raffle.totalBalls.forEach( ball =>  ball.isChecked = false );
    };

    $scope.addBallToCombiToSave = function(ball) {

      // avoid add a ball
      if ( $scope.getCountChecked() > $scope.raffle.countBalls ) {
        const arrIndex = ball.ballValue - 1;
        $scope.raffle.totalBalls[arrIndex].isChecked = false;
        return;
      }

      const numberConverted = Number( ball.ballValue );
      const lastZeroItem = getBallValues( $scope ).lastIndexOf( 0 );
      const indexChecked = getBallValues( $scope ).indexOf( numberConverted );

      if ( indexChecked === -1 ) {
        const tempObject = {
          ballValue: ball.ballValue,
          isChecked: ball.isChecked
        }
        Object.assign( $scope.raffle.combiToSave[lastZeroItem], tempObject );
        getCombiSorted( $scope );
      } else {
        $scope.raffle.combiToSave.splice( indexChecked, 1, new utilsService.BallModel( 0 ));
        getCombiSorted( $scope );
      }
      console.log($scope.raffle.combiToSave,'addBallToCombiToSave')
    }
  });
