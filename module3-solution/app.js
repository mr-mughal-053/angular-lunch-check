(function () {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective);

  /* -------------------------------------------------- Controller */
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.searchTerm = '';
    ctrl.found      = [];
    ctrl.loading    = false;

    ctrl.narrowItDown = function () {
      // empty search => clear list + show “Nothing found”
      if (!ctrl.searchTerm.trim()) {
        ctrl.found = [];
        return;
      }

      ctrl.loading = true;
      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
        .then(function (items) {
          ctrl.found = items;          // could be empty array
        })
        .catch(function (err) {
          console.error(err);
          ctrl.found = [];
        })
        .finally(function () {
          ctrl.loading = false;
        });
    };

    ctrl.removeItem = function (idx) {
      ctrl.found.splice(idx, 1);
    };
  }

  /* -------------------------------------------------- Service */
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
    var API_URL = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json';

    service.getMatchedMenuItems = function (searchTerm) {
      var term = searchTerm.toLowerCase();

      return $http({
        method: 'GET',
        url:    'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      })
      .then(function (resp) {
        var rootObj = resp.data;               // A, B, C, …
        var found   = [];

        // rootObj is an object of category objects
        angular.forEach(rootObj, function (category) {
          if (Array.isArray(category.menu_items)) {
            category.menu_items.forEach(function (item) {
              if (item.description &&
                  item.description.toLowerCase().indexOf(term) !== -1) {
                found.push(item);
              }
            });
          }
        });

        return found;          // resolves to [] if nothing matched
      });
    };

  }

  /* -------------------------------------------------- found-items directive */
  function FoundItemsDirective() {
    return {
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove:   '&'
      },
      template:
        `<div>
            <p ng-if="foundItems.length === 0">Nothing found</p>
            <ul class="list-group">
              <li class="list-group-item"
                  ng-repeat="item in foundItems track by $index">
                <strong>{{item.name}}</strong>
                ({{item.short_name}}):
                {{item.description}}
                <button class="btn btn-danger btn-xs pull-right"
                        ng-click="onRemove({index: $index})">
                  Don't want this one!
                </button>
              </li>
            </ul>
         </div>`
    };
  }

  /* -------------------------------------------------- loader directive */
  function ItemsLoaderIndicatorDirective() {
    return {
      restrict: 'E',
      template:
        '<div class="loader"></div>'   // inline; no XHR template fetch
    };
  }
})();
