/* global angular */

angular.module( 'lottoApp.directives', [])
  .directive( 'cardBall', function () {
    return {
      restrict: 'E',
      templateUrl: '../../templates/components/card-ball.html',
      scope: {
        title: '@',
        cardBalls: '=',
        isToggleCard: '='
      }
    };
  })
  .directive( 'actionButtons', function () {
    return {
      restrict: 'E',
      templateUrl: '../../templates/components/action-buttons.html',
      scope: {
        firstCall: '&',
        firstText: '@',
        secondCall: '&',
        secondText: '@',
        thirdCall: '&',
        thirdText: '@',
        countChecked: '&',
        countBalls: '='
      }
    };
  })
  .filter( 'addStringZero', function () {
    return function ( array ) {
      if ( array === undefined ) {
        return [];
      }
      return array.map( ball => {
        return ball <= 9 ? `0${ball}` : ball;
      });
    };
  });
