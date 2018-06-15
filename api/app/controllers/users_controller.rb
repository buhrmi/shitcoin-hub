class UsersController < ApplicationController
  
  before_action :require_user!

  def show
    render json: current_user
  end

end
