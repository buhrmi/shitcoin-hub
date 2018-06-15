for asset in @assets
  json.child! do
    json.merge! asset
  end
end