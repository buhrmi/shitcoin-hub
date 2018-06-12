class Asset < ActiveRecord::Base
  belongs_to :manager, class_name: 'User'

  def unit
    10 ** decimals
  end
end