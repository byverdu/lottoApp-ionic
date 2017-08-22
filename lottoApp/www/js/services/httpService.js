/* global angular */
angular.module( 'lottoApp.services' )
  .service( 'httpService', function ( $http ) {
    function getLottos() {
      return $http.get( 'http://api.byverdu.es/lottos' );
    }
    function getLottoById( lottoId ) {
      return $http.get( `http://api.byverdu.es/${lottoId}` );
    }
    return {
      getLottos,
      getLottoById
    };
  });
