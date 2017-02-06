angular.module('parkett', ['ui.router', 'templates', 'Devise'])
.constant('defaultState', 'index')
.config([
  'defaultState',
  '$stateProvider',
  '$urlRouterProvider',
  function (defaultState, $stateProvider, $urlRouterProvider) {

    var goToLoginIfNotLoggedIn = [
      'auth',
      function (auth) {
        auth.setCurrentTarget();
        if (!auth.isAuthenticated()) {
          auth.goToLogin({error: 'Please log in to view this page'});
        }
      }
    ];

    var gotToTargetIfLoggedIn = ['auth', function (auth) {
      if (auth.isAuthenticated()) {
        auth.goToTarget();
      }
    }];

    var userPromise = {
      userPromise: ['auth', function (auth) {
        return auth.currentUser().then(function () {}, function () {});
      }]
    };

    $stateProvider
      .state('index', {
        url: '/index',
        templateUrl: 'index/_index.html',
        controller: 'IndexCtrl',
        resolve: userPromise,
        onEnter: goToLoginIfNotLoggedIn
      })
      .state('liked', {
        url: '/liked',
        templateUrl: 'liked/_liked.html',
        controller: 'LikedCtrl',
        resolve: userPromise,
        onEnter: goToLoginIfNotLoggedIn
      }).state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        params: {error: null},
        resolve: userPromise,
        onEnter: gotToTargetIfLoggedIn
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        resolve: userPromise,
        onEnter: gotToTargetIfLoggedIn
      });

    $urlRouterProvider.otherwise(defaultState);
  }
]);
