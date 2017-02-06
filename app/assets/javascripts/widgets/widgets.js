angular.module('parkett')
.factory('widgets', [
  '$http',
  function ($http) {
    var factory = {};

    factory.tradingView = function (symbol, containerId) {
      new TradingView.widget({
        "autosize": true,
        "symbol": symbol,
        "container_id": containerId,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "White",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "save_image": false,
        "hideideas": true
      });
    };

    return factory;
  }
]);
