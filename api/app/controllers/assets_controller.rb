class AssetsController < ApplicationController
  before_action :require_user!

  def create
    @asset = Asset.create!(asset_params.merge(creator_id: current_user.id))
    render :show
  end

  def index
    @assets = Asset.where(search_params)
    puts @assets
  end

  def update
    @asset = Asset.find(params[:id])
    @asset.update_attributes!(asset_params)
    render :show
  end

  private
  def search_params
    params.permit(:platform, :symbol, :address)
  end
  
  def asset_params
    params.require(:asset).permit(:platform, :symbol, :address, *Asset.globalize_attribute_names)
  end
end
