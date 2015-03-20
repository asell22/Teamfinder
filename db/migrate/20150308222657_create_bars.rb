class CreateBars < ActiveRecord::Migration
  def change
    create_table :bars do |t|
      t.float :latitude
      t.float :longitude
      t.string :name
      t.string :url
      t.string :address

      t.timestamps
    end
  end
end
