class ApplicationController < ActionController::API
  include ::ActionController::Cookies
  include ActionController::HttpAuthentication::Token::ControllerMethods

  rescue_from ActiveRecord::RecordNotFound do |e|
    json_response({ message: e.message }, :not_found)
  end

  rescue_from ActiveRecord::RecordInvalid do |e|
    json_response({ message: e.message }, :unprocessable_entity)
  end
  
  before_action do
    authenticate_with_http_token do |token|
      @current_user = User.joins(:authorizations).where('authorizations.token' => token).first
    end
  end

  def current_user
    @current_user
  end

  def require_user
    return false unless current_user
  end
end
