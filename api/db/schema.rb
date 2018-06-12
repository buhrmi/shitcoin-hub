# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_11_075852) do

  create_table "assets", id: :string, force: :cascade do |t|
    t.string "manager_id"
    t.string "protocol"
    t.integer "decimals"
    t.string "contract"
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "sqlite_autoindex_assets_1", unique: true
  end

  create_table "authorizations", force: :cascade do |t|
    t.string "user_id"
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", id: :string, force: :cascade do |t|
    t.string "user_id"
    t.string "base_asset_id"
    t.string "quote_asset_id"
    t.string "type"
    t.string "direction"
    t.decimal "rate"
    t.integer "total", limit: 32
    t.integer "total_used", limit: 32
    t.integer "quantity", limit: 32
    t.integer "quantity_filled", limit: 32
    t.datetime "cancelled_at"
    t.datetime "filled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["base_asset_id"], name: "index_orders_on_base_asset_id"
    t.index ["cancelled_at"], name: "index_orders_on_cancelled_at"
    t.index ["filled_at"], name: "index_orders_on_filled_at"
    t.index ["id"], name: "sqlite_autoindex_orders_1", unique: true
    t.index ["quote_asset_id"], name: "index_orders_on_quote_asset_id"
    t.index ["rate"], name: "index_orders_on_rate"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "users", id: :string, force: :cascade do |t|
    t.string "email"
    t.string "display_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "sqlite_autoindex_users_1", unique: true
  end

end
