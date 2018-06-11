class Authorization < ActiveRecord::Base
  belongs_to :user

  after_initialize do
    self.id = SecureRandom.uuid unless self.id
  end
end
