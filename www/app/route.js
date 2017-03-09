(function _AppRoute_() {
  'use strict';

  function route($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      abstract: true,
      views: {
        '': {
          template: '<div ui-view="content" style="height: 100%;"></div>'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
  }

  angular.module('app').config(route);
}());
