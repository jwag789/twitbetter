class User < ActiveRecord::Base
  # Remember to create a migration!
  validates :username, :uniqueness => true
end
