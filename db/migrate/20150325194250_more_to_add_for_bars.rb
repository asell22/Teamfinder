class MoreToAddForBars < ActiveRecord::Migration
  def change
    # remove_column :table_name, :column_name
    add_column :bars, :latitude, :float
    add_column :bars, :longitude, :float
    add_column :bars, :url, :string
    add_column :bars, :phone, :string
  end
end
