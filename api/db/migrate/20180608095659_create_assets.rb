class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :creator_id
      
      t.string :symbol
      t.string :platform
      t.string :address

      t.string :details, size: 512
      t.timestamps
    end
  end
end
