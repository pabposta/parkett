angular.module('parkett')
.factory('signals', [
  '$http',
  function ($http) {
    var factory = {};

    factory.next = function () {
      return $http.get('user_trading_signals/next.json');
    };

    factory.liked = function (page) {
      return $http.get('user_trading_signals/liked/' + page + '.json');
    };

    factory.like = function (signal) {
      return $http.patch('user_trading_signals/' + signal._id.$oid + '/like')
    };

    factory.discard = function (signal) {
      return $http.patch('user_trading_signals/' + signal._id.$oid + '/discard')
    };

    return factory;
  }
]);
