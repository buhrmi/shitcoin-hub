<template lang="pug">
  .page
    .wrapper
      h1 Shitcoin Balances
      .balance(v-for="balance in balances")
        p {{ balance.asset.name }}: {{ balance.balance }}
</template>

<script lang="coffee">
module.exports =
  asyncData: ({app: {$axios}}) ->
    balances: await $axios.$get('/balances')

</script>
