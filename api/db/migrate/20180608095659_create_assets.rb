class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets, id: 'string' do |t|
      t.string :manager_id
      t.string :website
      t.string :data, size: 512
      t.timestamps
    end
  end
end
