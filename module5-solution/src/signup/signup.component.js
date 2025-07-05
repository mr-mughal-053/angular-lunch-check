(function () {
  'use strict';

  angular
    .module('public')
    .component('signup', {
      templateUrl: 'src/signup/signup.html',
      controller: SignUpController
    });

  SignUpController.$inject = ['MenuDataService', 'UserService'];
  function SignUpController(MenuDataService, UserService) {
    var $ctrl = this;

    $ctrl.user = {};
    $ctrl.completed = false;
    $ctrl.menuError = false;

    $ctrl.submit = function (form) {
      if (!form.$valid) { return; }

      var fav = ($ctrl.user.favorite || '').toUpperCase().trim();
      var cat = fav.match(/[A-Z]+/);
      var num = fav.match(/\d+/);

      if (!cat || !num) {
        $ctrl.menuError = true;
        return;
      }

      var shortName = cat[0];
      var index = parseInt(num[0], 10) - 1;   // menu index is 1-based

      MenuDataService.getItemsForCategory(shortName)
        .then(function (data) {
          var item = data.menu_items[index];
          if (!item) { throw 'bad'; }

          $ctrl.menuError = false;
          $ctrl.user.favoriteItem = item;
          UserService.save($ctrl.user);
          $ctrl.completed = true;
        })
        .catch(function () {
          $ctrl.menuError = true;
          $ctrl.completed = false;
        });
    };
  }
})();
