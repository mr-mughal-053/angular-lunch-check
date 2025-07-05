(function() {
  'use strict';

  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // ToBuyController
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  // AlreadyBoughtController
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var already = this;
    already.items = ShoppingListCheckOffService.getBoughtItems();
  }

  // Service
  function ShoppingListCheckOffService() {
    var service = this;

    // initial "to buy" items
    var toBuyItems = [
      { name: 'cookies',     quantity: 10 },
      { name: 'chips',       quantity: 5  },
      { name: 'soda',        quantity: 2  },
      { name: 'apples',      quantity: 4  },
      { name: 'sandwiches',  quantity: 3  }
    ];
    var boughtItems = [];

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };

    service.buyItem = function(index) {
      var item = toBuyItems[index];
      boughtItems.push(item);
      toBuyItems.splice(index, 1);
    };
  }

})();
