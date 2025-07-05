(function () {
  'use strict';

  angular
    .module('public')
    .config(RouteConfig)
    .controller('CatsCtrl', CatsCtrl)       // existing list-categories state
    .controller('ItemsCtrl', ItemsCtrl);    // existing items-state

  RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RouteConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      /* HOME (unchanged) */
      .state('public', {
        abstract: true,
        template: '<ui-view></ui-view>'
      })
      .state('public.home', {
        url: '/',
        template: '<h3 class="text-center">Welcome to our Restaurant</h3>'
      })

      /* existing categories / items states omitted for brevity … */

      /* ----------  NEW STATES  ---------- */

      .state('public.signup', {
        url: '/signup',
        template: '<signup></signup>'
      })

      .state('public.myinfo', {
        url: '/myinfo',
        template: '<my-info></my-info>'
      });
  }

  /* STUB controllers for existing menu flow (if still used) */
  CatsCtrl.$inject = ['categories'];
  function CatsCtrl(categories) { var vm = this; vm.categories = categories; }

  ItemsCtrl.$inject = ['items'];
  function ItemsCtrl(items) { var vm = this; vm.items = items; }
})();
