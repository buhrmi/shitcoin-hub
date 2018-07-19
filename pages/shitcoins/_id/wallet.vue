<template lang="pug">
  .content
    .wrapper
      h1 Your {{ shitcoin.name }} Wallet
      p(v-if="deposit_address") Your deposit address: {{ deposit_address.address }}
      p Current balance: {{ balance.balance }}
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}, params, error, store}) ->
    [shitcoin, deposit_addresses, balances] = await Promise.all [
      $axios.$get("/shitcoins/#{params.id}"),
      $axios.$get('/addresses', params: {shitcoin_id: params.id}),
      $axios.$get('/balances', params: {shitcoin_id: params.id})
    ]

    if !shitcoin
      error({ statusCode: 404, message: 'Couldnt find your stupid shitcoin. Thats a 404.' })

    deposit_address = deposit_addresses[0]

    return
      shitcoin: shitcoin
      balance: balances[0]
      deposit_address: deposit_address
</script>
