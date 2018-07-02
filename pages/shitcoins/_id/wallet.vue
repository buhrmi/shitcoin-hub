<template lang="pug">
  .content
    .wrapper
      h1 Your {{ shitcoin.name }} Wallet
      p Your deposit address: {{ deposit_address.address }}
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin, assets] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get('/assets', params: {shitcoin_id: params.id})
    ]

    active_asset = assets[0] # TODO: save "active" asset in database
    if !active_asset
      error({ statusCode: 404, message: 'This shitcoin does not have a wallet.' })

    deposit_addresses = await $axios.$get("/addresses", params: {asset_id: active_asset.id})
    deposit_address = deposit_addresses[0]

    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })

    return
      shitcoin: shitcoin
      assets: assets
      deposit_address: deposit_address
</script>
