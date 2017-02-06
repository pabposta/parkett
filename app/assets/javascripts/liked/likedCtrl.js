angular.module('parkett')
.controller('LikedCtrl', [
  '$scope',
  'signals',
  'widgets',
  '$timeout',
  function ($scope, signals, widgets, $timeout) {
    // init state variables
    // user has no signals flag
    $scope.noSignals = false;
    // all signals have been loaded flag
    $scope.noMoreSignals = false;
    // current signal page, as signals are retrieved in pages
    $scope.page = 1;
    // helper variable which counts the number of widget containers for assigning ids to them
    var containerCounter = 0;
    // all signals that have been loaded so far, list of dicts where the key is
    // the container id of the signal and the value is the signal
    $scope.signalsWithContainerIds = [];
    // keeps track of when there is a date change between two signals. the key
    // is the container id of the signal on which the date changed (dates are in
    // reverse order). the value is the new date.
    $scope.dateChangesByContainerId = {};

    /*
    Load the next page of signals
    */
    $scope.loadNextPage = function () {
      $scope.loading = true;

      // get the next page from the server
      signals.liked($scope.page).then(function (likedSignalResponse) {
        $scope.loading = false;
        $scope.error = null;

        // extract signals from response
        var likedSignals = likedSignalResponse.data.signals;
        // extract if this was the last page of signals and there are no more
        $scope.noMoreSignals = likedSignalResponse.data.last_page;
        if (likedSignals.length > 0) {
          // if we have any signals, create the widgets
          // first, map a container id to every signal. we need to know the ids
          // beforehand, because we need to pass them to the widget factory
          var nextSignalsWithContainerIds = likedSignals.map(function (likedSignal) {
            var containerId = 'st-signal-chart-' + containerCounter;
            containerCounter++;
            return {
              containerId: containerId,
              signal: likedSignal
            }
          });
          // then find all the places where there is a date change between two
          // signals so that we can insert the date markers between them. we
          // start with the last signal of the previous page to cover the case
          // where the change happens between pages. the expression evaluates to
          // undefined for the first page. in that case we insert a dummy signal
          // with today's date to let users know the first signal is no longer
          // fresh. the containerId is not needed for the dummy (the date change
          // is only assigned to the next signal and its container).
          var dummyCurrentSignal = {signal: {created_at: new Date()}},
              lastSignalWithContainerId = $scope.signalsWithContainerIds.slice(-1)[0] || dummyCurrentSignal;
          findDateChanges(lastSignalWithContainerId, nextSignalsWithContainerIds);
          // now add the new signals to the list of all signals
          Array.prototype.push.apply($scope.signalsWithContainerIds, nextSignalsWithContainerIds);
          // create the widgets. we use a timeout to give the containers time to
          // be created first. the timeout is 0, but it seems to delay execution
          // until after the ng-repeat has been evaluated.
          $timeout(function () {
            nextSignalsWithContainerIds.forEach(function (signalWithContainerId) {
              widgets.tradingView(signalWithContainerId.signal.trading_signal.ticker.tradingview, signalWithContainerId.containerId);
            });
          }, 0);
          // increase page counter
          $scope.page++;
        }
        else {
          // all signa have been loaded, so set the corresponding flag
          $scope.noMoreSignals = true;
          // if our page counter says we are on the first page, that means there are no signals at all.
          if ($scope.page == 1) {
            $scope.noSignals = true;
          }
        }
      }, function (errorResponse) {
        $scope.loading = false;
        $scope.error = errorResponse;
      });
    };

    // start out by loading the first page automatically
    $scope.loadNextPage();

    /*
    Given two signals, check if the date changes between them and set the date
    change flag for the signal's container.
    */
    function findDateChange(prevSignalWithContainerId, nextSignalWithContainerId) {
      // convert the dates from timestamp to the user locale's date
      var prevSignalDate = new Date(prevSignalWithContainerId.signal.created_at).toLocaleDateString(),
          nextSignalDate = new Date(nextSignalWithContainerId.signal.created_at).toLocaleDateString();
      // if the dates don't match, there is a change, so set the flag. we will
      // be able to insert a date marker before the next signal. signals are
      // ordered by date, descending (although the algorithm would be the same
      // for ascending).
      if (prevSignalDate != nextSignalDate) {
        $scope.dateChangesByContainerId[nextSignalWithContainerId.containerId] = nextSignalDate;
      }
    }

    /*
    Given the last previous signal and a list of the new signals, find all
    places where the date between the two changes and set the date change flags
    for those signals. The last previous signal can be undefined or null if
    there is none.
    */
    function findDateChanges(lastSignalWithContainerId, newSignalsWithContainerIds) {
      // if there is a last previous signal, look for a date change between it and the first new signal
      if (lastSignalWithContainerId && newSignalsWithContainerIds.length > 0) {
        findDateChange(lastSignalWithContainerId, newSignalsWithContainerIds[0]);
      }
      // look for date changes between the new signals
      for (var i = 1; i < newSignalsWithContainerIds.length; i++) {
        findDateChange(newSignalsWithContainerIds[i-1], newSignalsWithContainerIds[i]);
      }
    }
  }
]);
