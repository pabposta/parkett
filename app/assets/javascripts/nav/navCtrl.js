angular.module('parkett')
.controller('NavCtrl', [
  '$scope',
  'auth',
  function ($scope, auth) {

    $scope.isAuthenticated = auth.isAuthenticated;

    $scope.logout = function () {
      auth.logout().then(function () {
        auth.goToLogin();
      });
    };
  }
]);
