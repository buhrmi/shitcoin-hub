<template lang="pug">
  .page
    .wrapper
      h1 Shitcoin Balances
      .balance(v-for="balance in balances")
        p {{ balance.shitcoin.name }}: {{ balance.balance }}
        nuxt-link.button(:to="{name: 'shitcoins-id-wallet', params: {id: balance.shitcoin.id}}") Go to wallet
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    balances: await $axios.$get('/balances')

</script>
