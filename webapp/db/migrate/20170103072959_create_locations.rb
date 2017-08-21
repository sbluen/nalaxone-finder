class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :contents
      t.string :status
      t.float :lat
      t.float :long
      t.string :address
      t.integer :posterid

      t.timestamps
    end
  end
end
