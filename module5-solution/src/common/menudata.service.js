(function () {
  'use strict';

  angular
    .module('common')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var BASE = 'https://coursera-jhu-default-rtdb.firebaseio.com';

    this.getAllCategories = function () {
      return $http.get(BASE + '/categories.json')
                  .then(r => r.data);
    };

    this.getItemsForCategory = function (shortName) {
      return $http.get(BASE + '/menu_items/' + shortName + '.json')
                  .then(r => r.data);
    };
  }
})();
