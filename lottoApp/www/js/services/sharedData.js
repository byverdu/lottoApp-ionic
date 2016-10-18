/* global angular */

angular.module( 'lottoApp.services' )
  .service( 'sharedData', function () {
    const data = {};
    this.setData = function ( dataToSave ) {
      Object.assign( data, dataToSave );
      console.log( data, dataToSave );
    };
    this.getData = function () {
      return data;
    };
    return {
      getData: this.getData,
      setData: this.setData
    };
  });
