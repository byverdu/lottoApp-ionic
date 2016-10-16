/* global angular */

angular.module( 'lottoApp.directives', [])
  .directive( 'cardBall', function () {
    return {
      restrict: 'E',
      templateUrl: '../../templates/card-ball.html',
      scope: {
        title: '@',
        cardBalls: '=',
        isToggleCard: '='
      }
    };
  });
