(function () {
  'use strict';

  angular
    .module('public')
    .component('myInfo', {
      templateUrl: 'src/myinfo/myinfo.html',
      controller: MyInfoController
    });

  MyInfoController.$inject = ['UserService'];
  function MyInfoController(UserService) {
    var $ctrl = this;
    $ctrl.registered = UserService.isRegistered();

    if ($ctrl.registered) {
      $ctrl.user = UserService.get();
    }
  }
})();
