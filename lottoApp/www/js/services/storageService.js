/* global angular */

angular.module( 'lottoApp.services' )
  .service( 'storageService', function ( $localStorage ) {

    function setStorageForLottos() {
      return $localStorage.$default({
        primitiva: [],
        bonoloto: [],
        euromillions: []
      });
    }

    function setStorageForId( lottoID, combi ) {
      $localStorage[lottoID].push( combi );
    }

    function getStorageForId( lottoID ) {
      return $localStorage[lottoID];
    }

    return {
      setStorageForLottos,
      setStorageForId,
      getStorageForId
    };
  });
