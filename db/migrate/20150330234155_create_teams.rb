class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.integer :bar_id
      t.string :name
    end
  end
end
