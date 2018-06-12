class User < ActiveRecord::Base
  has_many :authorizations

  after_initialize do
    self.id = SecureRandom.uuid unless self.id
  end
end
