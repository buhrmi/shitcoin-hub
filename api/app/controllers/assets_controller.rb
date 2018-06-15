class AssetsController < ApplicationController
  before_action :require_user!

  def create
    Asset.create(asset_params.merge(creator_id: current_user))
  end

  def index
    @assets = Asset.where(search_params)
  end

  private
  def search_params
    params.permit(:platform, :symbol, :address)
  end
  
  def asset_params
    params.require(:asset).permit(:platform, :symbol, :address)
  end
end
