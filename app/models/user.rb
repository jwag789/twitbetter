class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :friends
  validates :username, :uniqueness => true
end
