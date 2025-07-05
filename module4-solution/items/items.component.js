(function () {
  'use strict';

  angular
    .module('MenuApp')
    .component('items', {
      templateUrl: 'items/items.html',
      bindings: {
        items:        '<',
        categoryName: '@'
      }
    });
})();
