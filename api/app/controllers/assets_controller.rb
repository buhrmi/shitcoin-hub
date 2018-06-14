class AssetsController < ApplicationController
  before_action :require_user!

  def create
    Asset.create(asset_params.merge(manager_id: current_user))
  end

  private
  def asset_params
    params.require(:asset)
  end
end
