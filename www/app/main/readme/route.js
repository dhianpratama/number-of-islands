(function _AppMainReadmeRoute_() {
  'use strict';

  function route($stateProvider) {
    $stateProvider.state('app.main.readme', {
      url: '/readme',
      views: {
        'content@app.main': {
          templateUrl: 'app/main/readme/index.html',
          controller: 'MainReadmeController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        controller: function getController($ocLazyLoad) {
          return $ocLazyLoad.load('app/main/readme/controller.js');
        }
      }
    });
  }

  angular.module('app.main.readme').config(route);
}());
