angular.module('parkett')
.factory('auth', [
  'Auth',
  'defaultState',
  '$state',
  function (Auth, defaultState, $state) {

    var _targetState = null;

    var factory = {
      login: Auth.login,
      register: Auth.register,
      isAuthenticated: Auth.isAuthenticated,
      currentUser: Auth.currentUser
    };

    factory.setTargetState = function (targetState) {
      _targetState = targetState;
      return factory;
    };

    factory.setCurrentTarget = function () {
      factory.setTargetState($state.transition.$to().name);
      return factory;
    }

    factory.clearTargetState = function () {
      _targetState = null;
      return factory;
    };

    factory.getTargetState = function () {
      return _targetState;
    };

    factory.goToTarget = function () {
      $state.go(_targetState || defaultState);
      return factory;
    };

    factory.goToLogin = function (params) {
      $state.go('login', params);
      return factory;
    };

    factory.logout = function () {
      factory.clearTargetState();
      return Auth.logout();
    };

    return factory;
  }
]);
