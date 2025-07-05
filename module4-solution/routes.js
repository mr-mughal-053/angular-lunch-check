(function () {
  'use strict';

  angular
    .module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Default to home
    $urlRouterProvider.otherwise('/');

    $stateProvider
      // Home -------------
      .state('home', {
        url: '/',
        template: '<h3 class="text-center">Welcome to our Restaurant</h3>'
      })

      // Categories -------
      .state('categories', {
        url: '/categories',
        template: '<categories categories="catsCtrl.categories"></categories>',
        controller: 'CategoriesStateController as catsCtrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Items -------------
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

  // tiny helper controllers just to pass resolved data into components
  angular.module('MenuApp')
    .controller('CategoriesStateController', CategoriesStateController)
    .controller('ItemsStateController',      ItemsStateController);

  CategoriesStateController.$inject = ['categories'];
  function CategoriesStateController(categories) {
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
