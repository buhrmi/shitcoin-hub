class Asset < ActiveRecord::Base
  belongs_to :creator, class_name: 'User'
  serialize :details

  def unit
    10 ** decimals
  end
end