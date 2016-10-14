/* global angular */
angular.module( 'lottoApp.services' )
  .service( 'httpService', function ( $http ) {
    function getLottos() {
      return $http.get( 'http://localhost:3800/lottos' );
    }
    return {
      getLottos
    };
  });
