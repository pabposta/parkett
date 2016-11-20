class TradingSignalStreamSubscription
  include Mongoid::Document
  include Mongoid::Timestamps

  belongs_to :trading_signal_stream
  belongs_to :user
end
