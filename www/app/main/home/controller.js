(function _AppMainHomeController_() {
  'use strict';

  function MainHomeController() {
    var vm = this;

    vm.matrixLength = 0;
    vm.islandsGrid = [];
    vm.numberOfIslands = 0;

    vm.processIslands = function generateIsland() {
      vm.islandsGrid = generateMatrix(vm.matrixLength);
      getNumberOfIslands(vm.islandsGrid);
    };

    function generateMatrix(len) {
      var islands = [];
      var i;
      var j;
      var row;
      var rand;
      var num;
      for (i = 0; i < len; i += 1) {
        row = [];
        for (j = 0; j < len; j += 1) {
          rand = Math.random();
          num = rand > 0.5 ? 1 : 0;
          row.push(num);
        }
        islands.push(row);
      }
      return islands;
    }

    function getNumberOfIslands(islandsGrid) {
      var totalIslands = 0;
      var grid = angular.copy(islandsGrid);
      var i;
      var j;
      for (i = 0; i < grid.length; i += 1) {
        for (j = 0; j < grid[i].length; j += 1) {
          totalIslands += sink(grid, i, j);
        }
      }
      vm.numberOfIslands = totalIslands;
    }

    function sink(grid, i, j) {
      if (i < 0 || i === grid.length || j < 0 || j === grid[i].length || grid[i][j] === 0) {
        return 0;
      }
      grid[i][j] = 0;

      sink(grid, i + 1, j);
      sink(grid, i - 1, j);
      sink(grid, i, j + 1);
      sink(grid, i, j - 1);

      sink(grid, i - 1, j - 1);
      sink(grid, i + 1, j - 1);
      sink(grid, i - 1, j + 1);
      sink(grid, i + 1, j + 1);
      return 1;
    }
  }

  angular.module('app.main.home').controller('MainHomeController', MainHomeController);
}());
