Rails.application.routes.draw do
  get 'user_trading_signals/index'

  get 'user_trading_signals/liked'

  patch 'user_trading_signals/:id/like', to: 'user_trading_signals#like', as: :user_trading_signals_like

  patch 'user_trading_signals/:id/discard', to: 'user_trading_signals#discard', as: :user_trading_signals_discard

  post 'trading_signals/create'

  devise_for :users

  devise_scope :user do
    root to: "user_trading_signals#index"
  end

  root "devise/sessions#new"
end
