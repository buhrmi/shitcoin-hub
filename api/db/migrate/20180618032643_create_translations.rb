class CreateTranslations < ActiveRecord::Migration[5.2]
  def up
    Asset.create_translation_table!({
      :summary => :text
    })
  end

  def down
    Asset.drop_translation_table!
  end
end