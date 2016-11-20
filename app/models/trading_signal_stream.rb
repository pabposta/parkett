class TradingSignalStream
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name
  field :_id, default: ->{ name }
  has_many :trading_signal_stream_subscriptions
end
