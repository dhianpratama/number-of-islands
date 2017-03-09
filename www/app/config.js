(function _AppConfig_() {
  'use strict';

  function location($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

  function log($logProvider) {
    $logProvider.debugEnabled(true);
  }

  // function markdown(markdownConverterProvider) {
  //   var conf = {
  //     extensions: ['twitter']
  //   };
  //   markdownConverterProvider.config(conf);
  // }

  angular.module('app')
    .config(location)
    .config(log);
    // .config(markdown);
}());
