class TradingSignalsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    ticker = Ticker.new(params.require(:tickers).permit(Ticker.sources))
    trading_signal_streams = TradingSignalStream.find(params.require(:streams))
    time = ActiveSupport::TimeZone.new('UTC').parse(params.require(:time))
    trading_signal = TradingSignal.new(ticker: ticker, time: time)
    users = trading_signal_streams.map {
      |stream| stream.trading_signal_stream_subscriptions.map {
        |subscription| subscription.user
      }
    }.flatten
    user_trading_signals = users.map { |user| UserTradingSignal.create!(user: user, trading_signal: trading_signal) }
    
    render json: user_trading_signals
  end
end
