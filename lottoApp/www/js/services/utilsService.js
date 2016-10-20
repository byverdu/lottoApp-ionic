/* global angular */
angular.module( 'lottoApp.services' )
  .service( 'utilsService', function ( $http ) {

    function BallModel( ballValue ) {
      this.isChecked = false;
      this.ballValue = ballValue;
    }

    function getTotalBalls( lottoID ) {
      const config = {
        primitiva: 49,
        bonoloto: 49,
        euromillions: 50
      };
      return config[lottoID];
    }

    function getCountBalls( lottoID ) {
      const config = {
        primitiva: 6,
        bonoloto: 6,
        euromillions: 5
      };
      return config[lottoID];
    }

    function setArrayForBall( lottoID, typeBall, checker ) {
      const tempArray = [];
      let ballCount;
      switch ( typeBall ) {
        case 'count':
          ballCount = getCountBalls( lottoID );
          break;
        case 'total':
          ballCount = getTotalBalls( lottoID );
          break;
        default:
      }

      for ( let counter = 1; counter <= ballCount; counter++ ) {
        const isToCount = checker ? counter : 0;
        tempArray.push(
          new BallModel( isToCount )
        );
      }
      return tempArray;
    }

    function getRandomBallsByLotto( lottoID ) {
      const result = [];
      const countBalls = getCountBalls( lottoID );
      const totalBalls = getTotalBalls( lottoID );

      while ( result.length < countBalls ) {
        const valuesSaved = result.map( item => item.ballValue );
        const randomValue = Math.floor( Math.random() * totalBalls ) + 1;

        if ( valuesSaved.indexOf( randomValue ) === -1 ) {
          const ball = new BallModel( randomValue );
          ball.isChecked = true;
          result.push( ball );
        }
      }
      console.log( result, 'result getRandomBallsByLotto' );
      return result;
    }

    return {
      BallModel,
      getCountBalls,
      setArrayForBall,
      getRandomBallsByLotto
    };
  });
