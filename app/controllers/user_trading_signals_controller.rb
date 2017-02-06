class UserTradingSignalsController < ApplicationController
  before_action :authenticate_user!

  def next
    respond_with UserTradingSignal.find_by(seen_at: nil, user: current_user)
  end

  def liked
    page = params.require(:page)
    signals = UserTradingSignal.where(user: current_user, :liked_at.ne => nil, :liked_at.exists => true).order_by(liked_at: :desc).page(page).per(10)
    response = { signals: signals, last_page: signals.last_page? }
    respond_with response
  end

  def like
    @user_trading_signal = UserTradingSignal.find(params.require(:id))
    @user_trading_signal.liked_at = Time.now
    if !@user_trading_signal.seen_at
      @user_trading_signal.seen_at = @user_trading_signal.liked_at
    end
    @user_trading_signal.unset(:discarded_at)
    @user_trading_signal.save
  end

  def discard
    @user_trading_signal = UserTradingSignal.find(params.require(:id))
    @user_trading_signal.discarded_at = Time.now
    if !@user_trading_signal.seen_at
      @user_trading_signal.seen_at = @user_trading_signal.discarded_at
    end
    @user_trading_signal.unset(:liked_at)
    @user_trading_signal.save
  end
end
