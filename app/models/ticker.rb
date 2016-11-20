class Ticker
  include Mongoid::Document
  include Mongoid::Timestamps

  def self.sources
    [:tradingview]
  end

  self.sources.map { |source| field source }
  embedded_in :trading_signal
end
