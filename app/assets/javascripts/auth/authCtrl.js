angular.module('parkett')
.controller('AuthCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'auth',
  function ($scope, $state, $stateParams, auth) {

    $scope.error = $stateParams.error;

    $scope.login = function () {
      auth.login($scope.user).then(function () {
        auth.goToTarget();
      }, function (response) {
        $scope.error = response.data.error;
      });
    };

    $scope.register = function () {
      auth.register($scope.user).then(function () {
        auth.goToTarget();
      }, function (response) {
        $scope.error = response.data.errors;
      });
    };
  }
]);
