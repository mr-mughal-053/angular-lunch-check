(function () {
  'use strict';

  angular
    .module('MenuApp')
    .config(RoutesConfig)
    .controller('CatsStateController', CatsStateController)
    .controller('ItemsStateController', ItemsStateController);

  /* ---------------- routing ---------------- */
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      // HOME  — just template with link
      .state('home', {
        url: '/',
        template:
          `<div class="text-center">
             <h2>Welcome to our Restaurant</h2>
             <p>
               <a class="btn btn-primary" ui-sref="categories">
                 Browse Menu Categories
               </a>
             </p>
           </div>`
      })

      // CATEGORIES
      .state('categories', {
        url: '/categories',
        template: '<categories categories="catsCtrl.categories"></categories>',
        controller: 'CatsStateController as catsCtrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // ITEMS
      .state('items', {
        url: '/items/{shortName}',
        template: '<items items="itemsCtrl.items" category-name="{{itemsCtrl.title}}"></items>',
        controller: 'ItemsStateController as itemsCtrl',
        resolve: {
          itemsData: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName);
            }]
        }
      });
  }

  /* tiny state controllers just to pass resolved data into components */
  CatsStateController.$inject = ['categories'];
  function CatsStateController(categories) {
    var catsCtrl = this;
    catsCtrl.categories = categories;
  }

  ItemsStateController.$inject = ['itemsData'];
  function ItemsStateController(itemsData) {
    var itemsCtrl = this;
    itemsCtrl.items = itemsData.menu_items;
    itemsCtrl.title = itemsData.category.name;
  }
})();
