class ChangeBarsTable < ActiveRecord::Migration
  def change
    # remove_column :table_name, :column_name
    add_column :bars, :city, :string
    remove_column :bars, :latitude
    remove_column :bars, :longitude
    remove_column :bars, :url
  end
end
