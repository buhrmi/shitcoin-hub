# Shitcoin Manager API

This is a Sinatra app.

### How to run

To initialize the database and run migrations, just do `rake db:migrate`. Afterwards, run `rake db:seed` to load the initial data (from `db/seeds.rb`).

You can run the server with `ruby app.rb` or simply `rackup`.