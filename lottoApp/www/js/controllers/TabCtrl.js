/* global angular */

angular.module( 'lottoApp.controllers', [])
  .controller( 'TabCtrl', function(
    $scope,
    $stateParams,
    sharedData,
    httpService,
    utilsService,
    storageService
  ) {
    storageService.setStorageForLottos();
    $scope.lottoID = $stateParams.lottoID;
    httpService.getLottoById( $stateParams.lottoID ).then( data => {
      console.log(data);
      const lottoID = $stateParams.lottoID;
      const raffle = {
        data: data.data[lottoID],
        combiToSave: utilsService.setArrayForBall( lottoID, 'count', false ),
        totalBalls: utilsService.setArrayForBall( lottoID, 'total', true ),
        countBalls: utilsService.getCountBalls( lottoID ),
        combinations: storageService.getStorageForId( lottoID )
      };
      sharedData.setData( raffle );
    });
  });
