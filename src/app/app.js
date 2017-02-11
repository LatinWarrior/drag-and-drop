angular
.module('app', ['ui.router', 'dndLists'])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/simple');

  var simpleState = {
    name: 'simple',
    url: '/simple',
    component: 'simple',
    template: '<simple></simple>'
  }

  var nestedState = {
    name: 'nested',
    url: '/nested',
    component: 'nested',
    template: '<nested></nested>'
  }

  var typesState = {
    name: 'types',
    url: '/types',
    template: '<types></types>',
    component: 'types'
  }

  // templateUrl: '/src/app/nested/nested.html',

  $stateProvider.state(simpleState);
  $stateProvider.state(nestedState);
  $stateProvider.state(typesState);
});
