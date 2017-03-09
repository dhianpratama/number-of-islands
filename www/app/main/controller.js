(function _AppMainController_() {
  'use strict';

  function MainController($mdSidenav) {
    var vm = this;

    vm.toggleMenu = toggleMenu;

    function toggleMenu() {
      $mdSidenav('left').toggle();
    }
  }

  angular.module('app.main').controller('MainController', MainController);
}());
