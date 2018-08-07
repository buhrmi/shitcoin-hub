<template lang="pug">
  .content
    .wrapper
      shitcoin-header(:shitcoin="shitcoin")
      .balances(v-if="$store.state.balances[shitcoin.id]")
        p Balance: {{ $store.state.balances[shitcoin.id].balance }}
        p In orders: {{ $store.state.balances[shitcoin.id].in_orders }}
        p Available: {{ $store.state.balances[shitcoin.id].available }}
        
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}")
    ]

    return
      shitcoin: shitcoin
</script>
