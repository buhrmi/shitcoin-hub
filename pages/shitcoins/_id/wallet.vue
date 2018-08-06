<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="shitcoin")
      p(v-if="deposit_address") Your deposit address: {{ deposit_address.address }}
      .balances(v-if="$store.state.balances[shitcoin.id]")
        p Balance: {{ $store.state.balances[shitcoin.id].balance }}
        p In orders: {{ $store.state.balances[shitcoin.id].in_orders }}
        p Available: {{ $store.state.balances[shitcoin.id].available }}
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin, deposit_addresses] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get('/addresses', params: {shitcoin_id: params.id})
    ]

    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })

    deposit_address = deposit_addresses[0]

    return
      shitcoin: shitcoin
      deposit_address: deposit_address
</script>
