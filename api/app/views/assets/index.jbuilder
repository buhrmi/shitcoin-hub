for asset in @assets
  json.child! do
    json.merge! asset.attributes
    json.merge! asset.globalized_attributes
  end
end