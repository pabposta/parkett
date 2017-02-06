Rails.application.routes.draw do
  get 'user_trading_signals/next'

  get 'user_trading_signals/liked/:page', to: 'user_trading_signals#liked'

  patch 'user_trading_signals/:id/like', to: 'user_trading_signals#like', as: :user_trading_signals_like

  patch 'user_trading_signals/:id/discard', to: 'user_trading_signals#discard', as: :user_trading_signals_discard

  post 'trading_signals/create'

  devise_for :users

  root "application#angular"
end
