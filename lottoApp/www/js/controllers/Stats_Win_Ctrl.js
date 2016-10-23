/* global angular */

angular.module( 'lottoApp.controllers' )
  .controller( 'StatsCtrl', function (
    $scope,
    sharedData,
    utilsService
  ) {
    const statsCtrl = $scope;
    statsCtrl.raffle = sharedData.getData();
    statsCtrl.addStringZero = utilsService.addStringZero;

    statsCtrl.sortByIndexOrCount = function ( type ) {
      const stats = statsCtrl.raffle.data.statistics;
      switch ( type ) {
        case 'index':
          return stats.sort(
            ( a, b ) => a.index - b.index
          );
        case 'count':
          return stats.sort(
            ( a, b ) => b.count - a.count
          );
        default:
          return stats.sort(
            ( a, b ) => a.index - b.index
          );
      }
    };
  })
  .controller( 'WinCtrl', function (
    $scope,
    httpService,
    sharedData,
    $stateParams
  ) {
    const winCtrl = $scope;
    winCtrl.raffle = sharedData.getData();
    const lottoID = $stateParams.lottoID;
    console.log(lottoID);
    httpService.getLottoById( `${lottoID}Winner` ).then( data => {
      winCtrl.winnersData = data.data[`${lottoID}Winner`];
      console.log(data);
      winCtrl.tableData = Object.keys( winCtrl.winnersData.allWinners[0]);
    });

  });
