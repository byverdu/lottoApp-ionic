/* global angular */

angular.module( 'lottoApp.controllers' )
  .controller( 'ResultsCtrl', function( $scope , sharedData) {
    const resultCtrl = $scope;
    resultCtrl.raffle = sharedData.getData();
    console.log(resultCtrl, '$scope.raffle ResultsCtrl');

     resultCtrl.compareLastResultWithSaved = function() {
    const lastResultNumbers = this.raffleType.lastResultNumbers;
    if (lastResultNumbers === undefined || this.combinations === undefined) {
      return;
    }
    for (const index in this.combinations) {
      this.combinations[index].forEach(item => {
        if ( lastResultNumbers.indexOf(item.value) !== -1 ) {
          item.isChecked = true;
          if (this.indexRowMatch.indexOf(index) === -1) {
            this.indexRowMatch.push(index);
          }
        };
      });
    }
    // hiding those rows that doesn't contains selected
    this.buildArrayCombLength()
      .filter(
        item => this.indexRowMatch.indexOf(item) === -1
      )
      .forEach(
        item => jQuery(`#id_${item}`).hide()
      );
  }
  });
