class Authorization < ActiveRecord::Base
  belongs_to :user

  def self.dummy
    auth = new
    auth.token = SecureRandom.hex(16)
    auth
  end
end
