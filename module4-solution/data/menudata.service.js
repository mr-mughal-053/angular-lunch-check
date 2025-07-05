(function () {
  'use strict';

  angular
    .module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var service = this;
    var BASE = 'https://coursera-jhu-default-rtdb.firebaseio.com';

    service.getAllCategories = function () {
      return $http.get(BASE + '/categories.json').then(resp => resp.data);
    };

    service.getItemsForCategory = function (shortName) {
      return $http.get(BASE + '/menu_items/' + shortName + '.json')
                  .then(resp => resp.data);
    };
  }
})();
