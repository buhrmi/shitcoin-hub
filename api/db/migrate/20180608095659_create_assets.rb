class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets, id: 'string' do |t|
      t.string :manager_id
      t.string :protocol
      t.integer :decimals
      t.string :contract
      t.string :website
      t.timestamps
    end
  end
end
