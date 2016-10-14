/* global angular */
function getCountChecked( $scope ) {
  return $scope.raffle.totalBalls.filter( item => item.isChecked ).length;
}

function getCountBalls( $scope ) {
  return $scope.raffle.combiToSave.length;
}

function getBallValues( $scope ) {
  return $scope.raffle.combiToSave.map( combi => combi.ballValue );
}

function getCombiSorted( $scope ) {
  return $scope.raffle.combiToSave.sort(( a,b ) => a.ballValue - b.ballValue );
}

angular.module( 'lottoApp.controllers' )
  .controller( 'RaffleCtrl', function( $scope, $stateParams, httpService, utilsService ) {
    console.log($stateParams);
    httpService.getLottoById( $stateParams.lottoID ).then( data => {
      console.log(data);
      const lottoID = $stateParams.lottoID;
      $scope.raffle = {
        data: data.data[lottoID],
        combiToSave: utilsService.setArrayForBall( lottoID, 'count', false ),
        totalBalls: utilsService.setArrayForBall( lottoID, 'total', true )
      };
    });

    $scope.addBallToCombiToSave = function(ball) {
      console.log(ball);

      // avoid add a ball
      if ( getCountChecked( $scope ) > getCountBalls( $scope )) {
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
