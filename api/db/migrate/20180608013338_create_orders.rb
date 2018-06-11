class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders, id: 'string' do |t|
      t.string :user_id
      t.string :base_asset_id
      t.string :quote_asset_id
      t.string :type,                         comment: '"limit" or "market"'
      t.string :direction,                    comment: '"buy" or "sell"'
      t.decimal :rate,                        comment: 'The exchange rate (1 BASE = X QUOTE) to use for this order'
      t.integer :total, limit: 32,            comment: 'Only used for buy-market orders. The total amount of quote asset to use.'
      t.integer :total_used, limit: 32,       comment: 'Only used for buy-market orders. The amount of quote asset that has been used.'
      t.integer :quantity, limit: 32,         comment: 'Not used for buy-market orders. The quantity of (number of units) of the asset to purchase'
      t.integer :quantity_filled, limit: 32,  comment: 'Not used for buy-market orders. How many units have been filled.'
      t.timestamp :cancelled_at
      t.timestamp :filled_at
      t.timestamps

      t.index :user_id
      t.index :base_asset_id
      t.index :quote_asset_id
      t.index :rate
      t.index :cancelled_at
      t.index :filled_at
    end
  end
end
