'use strict';

/**
 * @ngdoc overview
 * @name tpFinalApp
 * @description
 * # tpFinalApp
 *
 * Main module of the application.
 */
angular
  .module('tpFinalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/vacuumCleaner.html',
        controller: 'VacuumCleanerCtrl',
        controllerAs: 'vacuumCleaner'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
