class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  respond_to :json

  def angular
    render 'layouts/application'
  end

  private
    def after_sign_out_path_for(resource_or_scope)
      new_user_session_path
    end
end
