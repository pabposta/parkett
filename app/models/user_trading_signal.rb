class UserTradingSignal
  include Mongoid::Document
  include Mongoid::Timestamps

  field :seen_at, type: Time
  field :liked_at, type: Time
  field :discarded_at, type: Time

  belongs_to :user
  embeds_one :trading_signal
end
