class CreateFriends < ActiveRecord::Migration
  def change
  	create_table :friends do |t|
  		t.string :screen_name
  		t.string :url
  		t.string :description
  		t.string :image
  		t.belongs_to :user
  	end
  end
end
