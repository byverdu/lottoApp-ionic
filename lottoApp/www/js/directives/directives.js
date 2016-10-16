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
  });
