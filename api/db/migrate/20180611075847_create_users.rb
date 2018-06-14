class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, id: 'string' do |t|
      t.string :email
      t.string :display_name
      t.string :eth_key
      t.integer :nonce
      t.timestamps
    end
  end
end
