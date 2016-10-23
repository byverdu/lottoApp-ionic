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

    function removeItemForId( lottoID, position ) {
      return $localStorage[lottoID].splice( position, 1 );
    }

    return {
      setStorageForLottos,
      setStorageForId,
      getStorageForId,
      removeItemForId
    };
  });
