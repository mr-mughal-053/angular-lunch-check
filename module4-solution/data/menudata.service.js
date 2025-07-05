(function () {
  'use strict';

  angular
    .module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var BASE = 'https://coursera-jhu-default-rtdb.firebaseio.com';

    this.getAllCategories = function () {
      return $http.get(BASE + '/categories.json')
                  .then(resp => resp.data);
    };

    this.getItemsForCategory = function (shortName) {
      return $http.get(BASE + '/menu_items/' + shortName + '.json')
                  .then(resp => resp.data);
    };
  }
})();
