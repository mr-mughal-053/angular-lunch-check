(function () {
  'use strict';

  angular
    .module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    // model
    $scope.lunchMenu     = '';
    $scope.message       = '';
    $scope.messageClass  = '';
    $scope.inputClass    = '';

    // action
    $scope.checkIfTooMuch = function () {
      // split, trim, and filter out empty entries
      var items = $scope.lunchMenu
        .split(',')
        .map(function(item) { return item.trim(); })
        .filter(function(item) { return item.length > 0; });

      if (items.length === 0) {
        setFeedback('Please enter data first', 'error');
      } else if (items.length <= 3) {
        setFeedback('Enjoy!', 'ok');
      } else {
        setFeedback('Too much!', 'ok');
      }
    };

    // helper to update message + styling
    function setFeedback(text, status) {
      $scope.message = text;

      if (status === 'ok') {
        // green text + green input border
        $scope.messageClass = 'text-success';
        $scope.inputClass   = 'is-valid';
      } else {
        // red text + red input border
        $scope.messageClass = 'text-danger';
        $scope.inputClass   = 'is-invalid';
      }
    }
  }
})();
