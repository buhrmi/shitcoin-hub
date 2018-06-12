class AuthorizationsController < ApplicationController
  def create
    user = User.where(email: params['email']).first_or_create
    auth = Authorization.dummy
    auth.user = user
    auth.save!
    cookies[:authorization] = auth.token
    render plain: auth.token
  end
end
