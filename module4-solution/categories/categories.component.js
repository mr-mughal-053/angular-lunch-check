(function () {
  'use strict';

  angular
    .module('MenuApp')
    .component('categories', {
      templateUrl: 'categories/categories.html',
      bindings: {
        categories: '<'
      }
    });
})();
