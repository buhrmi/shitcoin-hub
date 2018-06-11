if testing?
  assets = [
    {symbol: 'ETH', protocol: 'eth', decimals: 18, website: 'https://ethereum.org'},
    {symbol: 'WUB', protocol: 'erc20', decimals: 18, contract_address: '0xc086a7bbf9550ff0d2de99c36494a82f4a673fe1'},
    {symbol: 'WHS', protocol: 'erc20', decimals: 18, contract_address: '0xb054da89f49d937fa26260e59502a4cd60881a3b'},
    {symbol: 'JPY', protocol: 'fiat', decimals: 0}
  ]
else
  assets = []
end

for asset in assets
  Asset.create(asset)
end