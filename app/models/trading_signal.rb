class TradingSignal
  include Mongoid::Document
  include Mongoid::Timestamps

  field :time, type: Time
  embeds_one :ticker
  embedded_in :user_trading_signal
end
