angular.module('parkett')
.controller('IndexCtrl', [
  '$scope',
  'signals',
  'widgets',
  function ($scope, signals, widgets) {

    /*
    Find the next signal of the stream
    */
    $scope.next = function () {
      // reset state tracking variables
      $scope.loading = true;
      $scope.signal = null;
      $scope.noSignals = false;
      $scope.error = null;

      // make async call to get the signal
      signals.next().then(function (signalResponse) {
        $scope.loading = false;
        $scope.signal = signalResponse.data;
        if ($scope.signal) {
          // create the widget if we got a signal
          widgets.tradingView($scope.signal.trading_signal.ticker.tradingview, 'st-signal-chart');
        }
        else {
          // set the flag that there are no more signals
          $scope.noSignals = true;
        }
      }, function (errorResponse) {
        $scope.loading = false;
        $scope.error = errorResponse;
      });
    };

    $scope.like = function () {
      // like the signal and get the next one
      signals.like($scope.signal).then(function () {
        $scope.next();
      });
    };

    $scope.discard = function () {
      // discard the signal and get the next one
      signals.discard($scope.signal).then(function () {
        $scope.next();
      });
    };

    $scope.next();
  }
]);
