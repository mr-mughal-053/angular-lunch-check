(function () {
  'use strict';

  angular
    .module('common')
    .service('UserService', UserService);

  function UserService() {
    var savedUser = null;

    this.save = function (obj) { savedUser = obj; };
    this.get  = function ()     { return savedUser; };
    this.isRegistered = function () { return !!savedUser; };
  }
})();
