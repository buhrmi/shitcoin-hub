class CreateAuthorizations < ActiveRecord::Migration[5.2]
  def change
    create_table :authorizations do |t|
      t.string :user_id
      t.string :token
      t.timestamps
    end
  end
end
