class Asset < ActiveRecord::Base
  belongs_to :manager, class_name: 'User'
  serializes :data
  
  def unit
    10 ** decimals
  end
end